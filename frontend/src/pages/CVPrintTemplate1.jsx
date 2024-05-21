import React from "react";

const CVPrintTemplate1 = ({ cvData, cvPhotoUrl, qrCodeUrl, cvRef }) => {
  return (
    <div ref={cvRef}>
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
              width: "250px",
              height: "250px",
              objectFit: "cover",
              borderRadius: "8px",
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
            >
              {cvData.personalInfo.linkedIn}
            </a>
          </p>
        </div>
      )}
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
                <strong>Field of Study:</strong> {edu.fieldOfStudy}
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {edu.startDate ? edu.startDate.substring(0, 10) : "N/A"} -{" "}
                <strong>End Date:</strong>{" "}
                {edu.endDate ? edu.endDate.substring(0, 10) : "Present"}
              </p>
            </div>
          ))}
        </div>
      )}
      {cvData.technicalExperience && cvData.technicalExperience.length > 0 && (
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
                {exp.startDate ? exp.startDate.substring(0, 10) : "N/A"} -{" "}
                <strong>End Date:</strong>{" "}
                {exp.endDate ? exp.endDate.substring(0, 10) : "Present"}
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
                {cert.dateObtained ? cert.dateObtained.substring(0, 10) : "N/A"}
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
                <strong>Proficiency: </strong> {lang.grade}
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
