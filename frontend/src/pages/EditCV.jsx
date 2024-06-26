import React, { useEffect, useContext, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import PersonalInfoForm from "../components/PersonalInfoForm";
import CVNameForm from "../components/CVNameForm";
import AboutForm from "../components/AboutForm";
import EducationForm from "../components/EducationForm";
import TechnicalExperienceForm from "../components/TechnicalExperienceForm";
import PersonalProjectsForm from "../components/PersonalProjectsForm";
import CertificationsForm from "../components/CertificationsForm";
import LanguagesForm from "../components/LanguagesForm";
import SkillsForm from "../components/SkillsForm";
import { Spinner, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { requestOptions, base_url } from "../requestOptions";
import { useParams } from "react-router-dom";

const EditCV = () => {
  const { cvId } = useParams();
  const { userInfo } = useContext(AuthContext);
  const [cvData, setCvData] = useState(null);
  const [cvDataUpdated, setCvDataUpdated] = useState(null);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCVData = async () => {
      try {
        const response = await fetch(`${base_url}api/cv/${cvId}`, {
          ...requestOptions,
          headers: {
            ...requestOptions.headers,
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch CV data.");

        const data = await response.json();
        setCvData(data);
        setCvDataUpdated(data); // Initialize cvDataUpdated with fetched data
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to load CV data.");
      }
    };

    fetchCVData();
  }, [cvId, userInfo.token]);

  const handleSaveCV = async () => {
    const formData = new FormData();
    let imageName = "";
    if (imageFile) {
      formData.append("photo", imageFile);
      try {
        let requestParams = {
          method: "POST",
          body: formData,
        };
        const response = await fetch(
          `${base_url}api/uploadPhoto/${cvId}`,
          requestParams
        ); // Adjust the URL path as needed

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // If the POST request is successful, you can handle success (e.g., navigate, show message)
        let imageRespData = await response.json();
        imageName = imageRespData.fileName;
        console.log("Image Upload successful");
        cvDataUpdated.photoName = imageName;
      } catch (error) {
        console.error(
          "Failed to upload CV and photo. Please try again.",
          error
        );
        setError("Failed to upload CV and photo. Please try again.");
      }
    }
    try {
      let requestParams = {
        ...requestOptions,
        method: "PUT", // Assuming PUT for an update operation
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(cvDataUpdated), // Use cvDataUpdated for the save operation
      };
      const response = await fetch(`${base_url}api/cv/${cvId}`, requestParams);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle success, possibly navigate or show a success message
      navigate("/");
    } catch (error) {
      setError("Failed to update CV. Please try again.");
      window.scrollTo(0, 0);
    }
  };

  // Render loading spinner if cvData or cvDataUpdated is null
  if (!cvData || !cvDataUpdated) {
    return (
      <div
        className="d-flex justify-content-center"
        style={styles.spinnerContainer}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <NavbarComponent />
      <div style={styles.background}>
        <div style={styles.container}>
          {error && <Alert variant="danger">{error}</Alert>}
          {cvDataUpdated && ( // Check if cvDataUpdated is not null before rendering CVNameForm
            <CVNameForm
              cvName={cvDataUpdated.cvName}
              setCvName={(value) =>
                setCvDataUpdated({ ...cvDataUpdated, cvName: value })
              }
              setImageFile={setImageFile} // Pass setImageFile as a prop
              currentImage={cvData.photoName} // Pass the current image name
            />
          )}
          <AboutForm
            about={cvDataUpdated.about}
            setAbout={(value) =>
              setCvDataUpdated({ ...cvDataUpdated, about: value })
            }
          />
          <PersonalInfoForm
            personalInfo={cvDataUpdated.personalInfo}
            setPersonalInfo={(value) =>
              setCvDataUpdated({ ...cvDataUpdated, personalInfo: value })
            }
          />
          <EducationForm
            education={cvDataUpdated.education}
            setEducation={(value) =>
              setCvDataUpdated({ ...cvDataUpdated, education: value })
            }
          />
          <br></br>
          <TechnicalExperienceForm
            technicalExperience={cvDataUpdated.technicalExperience}
            setTechnicalExperience={(value) =>
              setCvDataUpdated({ ...cvDataUpdated, technicalExperience: value })
            }
          />{" "}
          <br></br>
          <PersonalProjectsForm
            personalProjects={cvDataUpdated.personalProjects}
            setPersonalProjects={(value) =>
              setCvDataUpdated({ ...cvDataUpdated, personalProjects: value })
            }
          />{" "}
          <br></br>
          <CertificationsForm
            certifications={cvDataUpdated.certifications}
            setCertifications={(value) =>
              setCvDataUpdated({ ...cvDataUpdated, certifications: value })
            }
          />{" "}
          <br></br>
          <LanguagesForm
            languages={cvDataUpdated.languages}
            setLanguages={(value) =>
              setCvDataUpdated({ ...cvDataUpdated, languages: value })
            }
          />{" "}
          <br></br>
          <SkillsForm
            skills={cvDataUpdated.skills}
            setSkills={(value) =>
              setCvDataUpdated({ ...cvDataUpdated, skills: value })
            }
          />{" "}
          <br></br>
          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="primary"
              onClick={handleSaveCV}
              style={styles.saveButton}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  background: {
    backgroundColor: "#e0e7ff",
    minHeight: "100vh",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    maxWidth: "1000px",
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(230, 230, 250, 0.8))",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  spinnerContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default EditCV;
