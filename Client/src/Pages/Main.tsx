import { useState, useEffect } from "react";
import axios from "axios";
import CensusForm from "../Components/CensusForm";
import CensusTable from "../Components/CensusTable";
function Main() {
  const [censusData, setCensusData] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    getCensusData();
  }, []);

  const handleFormSubmit = async (formData: any) => {
    await axios
      .post("http://localhost:5000/save-census", formData)
      .then(() => {
        getCensusData();
        setIsFormSubmitted(true);
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
      });
  };
  const getCensusData = async () => {
    await axios
      .get("http://localhost:5000/get-census")
      .then((response) => {
        setCensusData(response.data);
      })
      .catch((error) => {
        console.error("Error refreshing census data:", error);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center gap-8">
        <CensusForm onSubmit={handleFormSubmit} isFormSubmitted={isFormSubmitted} setIsFormSubmitted={setIsFormSubmitted}/>
        <h2 className="underline text-xl">Census Data</h2>
        <CensusTable censusData={censusData} />
      </div>
    </>
  );
}

export default Main;
