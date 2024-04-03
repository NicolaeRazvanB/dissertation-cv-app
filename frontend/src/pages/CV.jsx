import React, { useContext, useState, useEffect } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { AuthContext } from "../context/AuthContext";
import { requestOptions, base_url } from "../requestOptions";
import { useParams } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap"; // Import Spinner from react-bootstrap
import { useRef } from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import { useNavigate } from "react-router-dom";

const CV = () => {
  const { userInfo } = useContext(AuthContext);
  const { cvId } = useParams(); // Get the cvId from URL parameters
  const [cvData, setCvData] = useState(null); // State to hold CV data
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const cvRef = useRef();
  const doc = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCvData = async () => {
      try {
        const token = userInfo.token; // Extract token from userInfo
        const requestParams = {
          ...requestOptions,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include bearer token in headers
          },
        };
        const response = await fetch(
          `${base_url}api/cv/${cvId}`,
          requestParams
        );
        if (!response.ok) throw new Error("Failed to fetch CV data");
        const data = await response.json();
        setCvData(data); // Set the fetched data into state
      } catch (error) {
        console.error("Error fetching CV data:", error);
      }
    };

    fetchCvData();
  }, [cvId, userInfo.token]);

  const downloadPdfDocument = () => {
    if (doc.current) {
      doc.current.save();
    }
  };
  const handleDeleteCV = async (cvId) => {
    try {
      const token = userInfo.token;
      const requestParams = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(`${base_url}api/cv/${cvId}`, requestParams);

      if (!response.ok) {
        throw new Error("Failed to delete CV");
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Error deleting CV. Please try again.");
    }
  };
  return (
    <>
      <NavbarComponent />
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="container mt-4">
          <button
            className="btn btn-primary mb-3"
            onClick={downloadPdfDocument}
          >
            Download as PDF
          </button>{" "}
          <Button variant="danger" onClick={() => handleDeleteCV(cvId)}>
            Delete
          </Button>
          {cvData ? (
            <PDFExport
              paperSize="A4"
              margin="0.5cm"
              scale={0.5}
              fileName={cvData.cvName}
              ref={doc}
            >
              <div ref={cvRef}>
                {/* CV Name */}
                <h1 className="text-center">{cvData.cvName}</h1>

                {/* Personal Information Section */}
                {cvData.personalInfo && (
                  <div className="mb-4">
                    <h2>Personal Information</h2>
                    <p>
                      <strong>Name:</strong> {cvData.personalInfo.firstName}{" "}
                      {cvData.personalInfo.lastName}
                    </p>
                    <p>
                      <strong>Email:</strong> {cvData.personalInfo.email}
                    </p>
                    <p>
                      <strong>Phone Number:</strong>{" "}
                      {cvData.personalInfo.phoneNumber}
                    </p>
                    <p>
                      <strong>Address:</strong> {cvData.personalInfo.address}
                    </p>
                    <p>
                      <strong>LinkedIn:</strong>{" "}
                      <a
                        href={cvData.personalInfo.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {cvData.personalInfo.linkedIn}
                      </a>
                    </p>
                  </div>
                )}

                {/* About Section */}
                {cvData.about && (
                  <div className="mb-4">
                    <h2>About</h2>
                    <p>{cvData.about}</p>
                  </div>
                )}

                {/* Education Section */}
                {cvData.education && cvData.education.length > 0 && (
                  <div className="mb-4">
                    <h2>Education</h2>
                    {cvData.education.map((edu, index) => (
                      <div key={index}>
                        <p>
                          <strong>School:</strong> {edu.schoolName}
                        </p>
                        <p>
                          <strong>Degree:</strong> {edu.degree}
                        </p>
                        <p>
                          <strong>Field of Study:</strong> {edu.fieldOfStudy}
                        </p>
                        <p>
                          <strong>Start Date:</strong>{" "}
                          {edu.startDate
                            ? edu.startDate.substring(0, 10)
                            : "N/A"}{" "}
                          - <strong>End Date:</strong>{" "}
                          {edu.endDate
                            ? edu.endDate.substring(0, 10)
                            : "Present"}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technical Experience Section */}
                {cvData.technicalExperience &&
                  cvData.technicalExperience.length > 0 && (
                    <div className="mb-4">
                      <h2>Technical Experience</h2>
                      {cvData.technicalExperience.map((exp, index) => (
                        <div key={index}>
                          <p>
                            <strong>Company:</strong> {exp.companyName}
                          </p>
                          <p>
                            <strong>Position:</strong> {exp.position}
                          </p>
                          <p>
                            <strong>Description:</strong> {exp.description}
                          </p>
                          <p>
                            <strong>Start Date:</strong>{" "}
                            {exp.startDate
                              ? exp.startDate.substring(0, 10)
                              : "N/A"}{" "}
                            - <strong>End Date:</strong>{" "}
                            {exp.endDate
                              ? exp.endDate.substring(0, 10)
                              : "Present"}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                {/* Personal Projects Section */}
                {cvData.personalProjects &&
                  cvData.personalProjects.length > 0 && (
                    <div className="mb-4">
                      <h2>Personal Projects</h2>
                      {cvData.personalProjects.map((project, index) => (
                        <div key={index}>
                          <p>
                            <strong>Project Name:</strong> {project.name}
                          </p>
                          <p>
                            <strong>Description:</strong> {project.description}
                          </p>
                          {project.projectLink && (
                            <p>
                              <strong>Project Link:</strong>{" "}
                              <a
                                href={project.projectLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {project.projectLink}
                              </a>
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                {/* Certifications Section */}
                {cvData.certifications && cvData.certifications.length > 0 && (
                  <div className="mb-4">
                    <h2>Certifications</h2>
                    {cvData.certifications.map((cert, index) => (
                      <div key={index}>
                        <p>
                          <strong>Name:</strong> {cert.name}
                        </p>
                        <p>
                          <strong>Date Obtained:</strong>{" "}
                          {cert.dateObtained
                            ? cert.dateObtained.substring(0, 10)
                            : "N/A"}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Languages Section */}
                {cvData.languages && cvData.languages.length > 0 && (
                  <div className="mb-4">
                    <h2>Languages</h2>
                    {cvData.languages.map((lang, index) => (
                      <div key={index}>
                        <p>
                          <strong>Language:</strong> {lang.languageName} -{" "}
                          <strong>Proficiency: </strong> {lang.grade}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills Section */}
                {cvData.skills && cvData.skills.length > 0 && (
                  <div className="mb-4">
                    <h2>Skills</h2>
                    <div className="row">
                      {cvData.skills.map((skill, index) => (
                        <div key={index} className="col-md-4">
                          <p>
                            {skill.skillName} - {skill.proficiency}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </PDFExport>
          ) : (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CV;
