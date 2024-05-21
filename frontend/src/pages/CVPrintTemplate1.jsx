import React from "react";

const CVPrintTemplate1 = ({ cvData, cvPhotoUrl, qrCodeUrl, cvRef }) => {
  const containerStyle = {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  };

  const sectionTitleStyle = {
    color: "#2c3e50",
    borderBottom: "2px solid #2c3e50",
    paddingBottom: "5px",
    marginBottom: "10px",
  };

  const infoStyle = {
    marginBottom: "10px",
  };

  const imageContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  };

  const imageStyle = {
    width: "200px",
    height: "200px",
    borderRadius: "20%",
    border: "4px solid #2c3e50",
    objectFit: "cover",
  };

  return (
    <div ref={cvRef} style={containerStyle}>
      {cvPhotoUrl && (
        <div style={imageContainerStyle}>
          <img src={cvPhotoUrl} alt="CV Photo" style={imageStyle} />
        </div>
      )}

      {cvData.personalInfo && (
        <div style={infoStyle}>
          <h2 style={sectionTitleStyle}>Personal Information</h2>
          <p>
            <strong>Name:</strong> {cvData.personalInfo.firstName}{" "}
            {cvData.personalInfo.lastName}
          </p>
          <p>
            <strong>Email:</strong> {cvData.personalInfo.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {cvData.personalInfo.phoneNumber}
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
              style={{ color: "#2980b9" }}
            >
              {cvData.personalInfo.linkedIn}
            </a>
          </p>
        </div>
      )}
      {cvData.about && (
        <div style={infoStyle}>
          <h2 style={sectionTitleStyle}>About</h2>
          <p>{cvData.about}</p>
        </div>
      )}
      {cvData.education && cvData.education.length > 0 && (
        <div style={infoStyle}>
          <h2 style={sectionTitleStyle}>Education</h2>
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
                <strong>Duration:</strong>{" "}
                {edu.startDate ? edu.startDate.substring(0, 10) : "N/A"} -{" "}
                {edu.endDate ? edu.endDate.substring(0, 10) : "Present"}
              </p>
            </div>
          ))}
        </div>
      )}
      {cvData.technicalExperience && cvData.technicalExperience.length > 0 && (
        <div style={infoStyle}>
          <h2 style={sectionTitleStyle}>Technical Experience</h2>
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
                <strong>Duration:</strong>{" "}
                {exp.startDate ? exp.startDate.substring(0, 10) : "N/A"} -{" "}
                {exp.endDate ? exp.endDate.substring(0, 10) : "Present"}
              </p>
            </div>
          ))}
        </div>
      )}
      {cvData.personalProjects && cvData.personalProjects.length > 0 && (
        <div style={infoStyle}>
          <h2 style={sectionTitleStyle}>Personal Projects</h2>
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
                    style={{ color: "#2980b9" }}
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
        <div style={infoStyle}>
          <h2 style={sectionTitleStyle}>Certifications</h2>
          {cvData.certifications.map((cert, index) => (
            <div key={index}>
              <p>
                <strong>Name:</strong> {cert.name}
              </p>
              <p>
                <strong>Date Obtained:</strong>{" "}
                {cert.dateObtained ? cert.dateObtained.substring(0, 10) : "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
      {cvData.languages && cvData.languages.length > 0 && (
        <div style={infoStyle}>
          <h2 style={sectionTitleStyle}>Languages</h2>
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
        <div style={infoStyle}>
          <h2 style={sectionTitleStyle}>Skills</h2>
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
            style={{ width: 150, height: 150 }}
          />
        </div>
      )}
    </div>
  );
};

export default CVPrintTemplate1;
