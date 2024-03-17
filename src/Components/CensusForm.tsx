import { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  MenuItem,
  Snackbar,
  Alert,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface FormProps {
    isFormSubmitted: boolean;
    setIsFormSubmitted: (value: boolean) => void;
  onSubmit: (data: {
    id: number;
    name: string;
    gender: string;
    birthdate: string;
    vaccinated: boolean;
  }) => void;
}

const CensusForm = ({ onSubmit,isFormSubmitted,setIsFormSubmitted }: FormProps) => {
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [vaccinated, setVaccinated] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [error, setError] = useState<{
    nameError: boolean;
    genderError: boolean;
    dobError: boolean;
  }>({
    nameError: false,
    genderError: false,
    dobError: false,
  });
  useEffect(() => {
    axios
      .get("http://localhost:5000/get-census")
      .then((response) => {
        setId(response.data.length + 1);
      })
      .catch((error) => {
        console.error("Error refreshing census data:", error);
      });
  }, []);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) {
      setError((prevState) => ({
        ...prevState,
        nameError: true,
      }));
    } else if (!gender) {
      setError((prevState) => ({
        ...prevState,
        genderError: true,
      }));
    } else if (!birthdate) {
      setError((prevState) => ({
        ...prevState,
        dobError: true,
      }));
    } else {
      onSubmit({
        id: id,
        name,
        gender,
        birthdate,
        vaccinated,
      });
      setName("");
      setGender("");
      setBirthdate("");
      setVaccinated(false);
    }
  };

  const handleClose = () => {
    setIsFormSubmitted(false);
  };

  return (
    <Container maxWidth="sm">
      <h1 className="font-medium text-xl text-center ">
        Vaccination Census System and Trend Analysis
      </h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name*"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={error.nameError}
          helperText={error.nameError && "Name is required"}
          margin="normal"
        />
        <TextField
          fullWidth
          select
          label="Gender*"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          error={error.genderError}
          helperText={error.genderError && "Gender is required"}
          margin="normal"
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <TextField
          fullWidth
          type="date"
          label="Birth Date*"
          InputLabelProps={{ shrink: true }}
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          error={error.dobError}
          helperText={error.dobError && "Birth Date is required"}
          margin="normal"
        />

        <div className="w-fit">
          <FormLabel id="vaccinated">Vaccinated?</FormLabel>
          <RadioGroup
            aria-labelledby="Vaccinated"
            value={vaccinated.toString()}
            onChange={(e) => setVaccinated(e.target.value === "true")}
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
      <Snackbar open={isFormSubmitted} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Successfully add the data!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CensusForm;
