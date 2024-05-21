import React from "react";

const CVPrintTemplate2 = ({ cvData, cvPhotoUrl, qrCodeUrl, cvRef }) => {
  return (
    <div
      ref={cvRef}
      style={{
        display: "flex",
        margin: "10px",
        borderRadius: "8px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: "30%",
          padding: "20px",
          backgroundColor: "#333",
          color: "#fff",
          borderRadius: "8px 0 0 8px",
        }}
      >
        {cvPhotoUrl && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <img
              src={cvPhotoUrl}
              alt="CV Photo"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "50%",
                border: "2px solid #fff",
              }}
            />
          </div>
        )}

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
              <strong>Phone:</strong> {cvData.personalInfo.phoneNumber}
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
                style={{ color: "#fff" }}
              >
                {cvData.personalInfo.linkedIn}
              </a>
            </p>
          </div>
        )}
        {qrCodeUrl && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <img
              src={qrCodeUrl}
              alt="QR Code"
              style={{ width: 100, height: 100 }}
            />
          </div>
        )}
      </div>

      <div
        style={{
          width: "70%",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "0 8px 8px 0",
        }}
      >
        {cvData.about && (
          <div className="mb-4">
            <h2>About</h2>
            <p>{cvData.about}</p>
          </div>
        )}
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
                  <strong>Field:</strong> {edu.fieldOfStudy}
                </p>
                <p>
                  <strong>Period:</strong> {edu.startDate?.substring(0, 10)} -{" "}
                  {edu.endDate?.substring(0, 10) || "Present"}
                </p>
              </div>
            ))}
          </div>
        )}
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
                    <strong>Period:</strong> {exp.startDate?.substring(0, 10)} -{" "}
                    {exp.endDate?.substring(0, 10) || "Present"}
                  </p>
                </div>
              ))}
            </div>
          )}
        {cvData.personalProjects && cvData.personalProjects.length > 0 && (
          <div className="mb-4">
            <h2>Personal Projects</h2>
            {cvData.personalProjects.map((project, index) => (
              <div key={index}>
                <p>
                  <strong>Project:</strong> {project.name}
                </p>
                <p>
                  <strong>Description:</strong> {project.description}
                </p>
                {project.projectLink && (
                  <p>
                    <strong>Link:</strong>{" "}
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
        {cvData.certifications && cvData.certifications.length > 0 && (
          <div className="mb-4">
            <h2>Certifications</h2>
            {cvData.certifications.map((cert, index) => (
              <div key={index}>
                <p>
                  <strong>Certification:</strong> {cert.name}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {cert.dateObtained?.substring(0, 10) || "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}
        {cvData.languages && cvData.languages.length > 0 && (
          <div className="mb-4">
            <h2>Languages</h2>
            {cvData.languages.map((lang, index) => (
              <div key={index}>
                <p>
                  <strong>Language:</strong> {lang.languageName} -{" "}
                  <strong>Proficiency:</strong> {lang.grade}
                </p>
              </div>
            ))}
          </div>
        )}
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
    </div>
  );
};

export default CVPrintTemplate2;
