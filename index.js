import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

import fs from 'fs';

app.use(bodyParser.json());

// Read data from the JSON file
const jsonData = fs.readFileSync("hospitalData.json", "utf-8");
const data = JSON.parse(jsonData);

// GET operation to retrieve all hospitals
const getAllHospitals = () => {
  return data.hospitals;
};
//  console.log(getAllHospitals());


// POST operation to add a new hospital
const addHospital = (name, patientCount, location) => {
  const newHospital = {
    name: name,
    patientCount: patientCount,
    location: location
  };
  data.hospitals.push(newHospital);
  fs.writeFileSync("hospitalData.json", JSON.stringify(data));
  return newHospital;
};
// console.log(addHospital("PQR Hospital", 75, "Chicago"));

// PUT operation to update an existing hospital
const updateHospital = (name, updatedHospital) => {
  const index = data.hospitals.findIndex(hospital => hospital.name === name);
  if (index !== -1) {
    data.hospitals[index] = updatedHospital;
    fs.writeFileSync("hospitalData.json", JSON.stringify(data));
    return updatedHospital;
  } else {
    return "Hospital not found";
  }
};
// console.log(updateHospital("ABC Hospital", { name: "ABC Medical Center", patientCount: 60, location: "New York" }));

// DELETE operation to remove a hospital
const deleteHospital = (name) => {
  const index = data.hospitals.findIndex(hospital => hospital.name === name);
  if (index !== -1) {
    const deletedHospital = data.hospitals.splice(index, 1);
    fs.writeFileSync("hospitalData.json", JSON.stringify(data));
    return deletedHospital;
  } else {
    return "Hospital not found";
  }
};
// console.log(deleteHospital("XYZ Hospital"));




app.listen(PORT, console.log(`Server is running sucessfully on PORT ${PORT}`));





