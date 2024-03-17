import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, MenuItem, TextField } from "@mui/material";
interface VaccinatedData {
  age: number;
  vaccinatedCount: number;
  unvaccinatedCount: number;
}
interface GenderData {
  age: number;
  maleCount: number;
  femaleCount: number;
  otherCount:number
}
const CensusChart = () => {
  const [vaccinatedData, setVaccinatedData] = useState<VaccinatedData[]>([]);
  const [genderData, setGenderData] = useState<GenderData[]>([]);
  const [isVaccinated, setIsVaccinated] = useState("Yes");

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/count?is_vaccinated=${
          isVaccinated === "Yes" ? "true" : "false"
        }`
      )
      .then((response) => {
        setVaccinatedData(response.data.data);
      })
      .catch((error) => console.error(error));
  }, [isVaccinated]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/gender")
      .then((response) => {
        setGenderData(response.data.data);
      })
      .catch((error) => {
        console.error(
          "Error fetching gender data:",
          error
        );
      });
  }, []);

  const vaccinatedLabels = vaccinatedData.map((data) => data.age);
  const vaccinatedCounts = vaccinatedData.map((data) => data.vaccinatedCount);
  const unvaccinatedCounts = vaccinatedData.map((data) => data.unvaccinatedCount);

  const vaccinatedChartData = {
    labels: vaccinatedLabels,
    datasets: [
      {
        label: "Vaccinated",
        data: vaccinatedCounts,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "Unvaccinated",
        data: unvaccinatedCounts,
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const genderLabels = genderData.map((data) => data.age);
  const maleCounts = genderData.map((data) => data.maleCount);
  const femaleCounts = genderData.map((data) => data.femaleCount);
  const otherCounts = genderData.map((data) => data.otherCount);

  const genderChart = {
    labels: genderLabels,
    datasets: [
      {
        label: "Male",
        data: maleCounts,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Female",
        data: femaleCounts,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Other",
        data: otherCounts,
        backgroundColor: "rgba(99, 255, 132, 0.5)",
        borderColor: "rgba(99, 255, 132, 1)",        
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <Container maxWidth="sm">
        <Chart type="line" data={vaccinatedChartData} />
        <TextField
          fullWidth
          select
          value={isVaccinated}
          label="Is Vaccinated"
          onChange={(e) => setIsVaccinated(e.target.value)}
          margin="normal"
        >
          <MenuItem value="Yes">Yes</MenuItem>
          <MenuItem value="No">No</MenuItem>
        </TextField>
      </Container>
      <Container>
        <Chart type="bar" data={genderChart} />
      </Container>
    </div>
  );
};

export default CensusChart;
