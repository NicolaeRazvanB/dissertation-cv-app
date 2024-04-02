import React, { useState, useEffect } from "react";
import NavbarComponent from "../components/NavbarComponent";
import PersonalInfoForm from "../components/PersonalInfoForm"; // Ensure correct path

const AddCV = () => {
  const [CV, setCV] = useState({});
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    linkedIn: "",
  });
  useEffect(() => {
    CV.personalInfo = { personalInfo };
    console.log(CV);
  }, [personalInfo]);

  return (
    <>
      <NavbarComponent />
      <div className="container mt-4">
        <h2>Personal information</h2>
        <PersonalInfoForm
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
        />
      </div>
    </>
  );
};

export default AddCV;
