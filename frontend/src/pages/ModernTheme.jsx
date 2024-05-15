import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";

const ModernTheme = ({ cv, photoUrl }) => {
  if (!cv) {
    return <div className="text-center">No CV found.</div>;
  }

  return (
    <div style={{ backgroundColor: "#40E0D0", minHeight: "100vh" }}>
      <NavbarComponent />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            {photoUrl && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Card.Img
                  variant="top"
                  src={photoUrl}
                  alt="CV Photo"
                  style={{
                    width: "9vw",
                    height: "9vw",
                    borderRadius: "80px",
                    marginBottom: "8px",
                  }}
                />
              </div>
            )}
            <Card className="mb-4">
              <Card.Body>
                <Card.Title className="text-center mb-3">
                  Hello, I am {cv.personalInfo.firstName}{" "}
                  {cv.personalInfo.lastName}
                </Card.Title>

                <Card.Text>
                  You can reach me via email at {cv.personalInfo.email} or call
                  me at {cv.personalInfo.phoneNumber}.
                </Card.Text>
                <Card.Text>
                  You can also connect with me on{" "}
                  <a
                    href={cv.personalInfo.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  .
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>About Me</Card.Title>
                <Card.Text>{cv.about}</Card.Text>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Education</Card.Title>
                <ListGroup variant="flush">
                  {cv.education.map((edu, index) => (
                    <ListGroupItem key={index}>
                      {edu.schoolName}, {edu.degree} in {edu.fieldOfStudy} (
                      {new Date(edu.startDate).getFullYear()} -{" "}
                      {new Date(edu.endDate).getFullYear()})
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Work Experience</Card.Title>
                {cv.technicalExperience.map((exp, index) => (
                  <Card key={index} className="mb-2">
                    <Card.Body>
                      <Card.Title>
                        {exp.position} at {exp.companyName}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {new Date(exp.startDate).toLocaleDateString()} -{" "}
                        {new Date(exp.endDate).toLocaleDateString()}
                      </Card.Subtitle>
                      <Card.Text>{exp.description}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Certifications</Card.Title>
                <ListGroup variant="flush">
                  {cv.certifications.map((cert, index) => (
                    <ListGroupItem key={index}>
                      {cert.name} (Obtained:{" "}
                      {new Date(cert.dateObtained).toLocaleDateString()})
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Skills</Card.Title>
                <ListGroup variant="flush">
                  {cv.skills.map((skill, index) => (
                    <ListGroupItem key={index}>
                      {skill.skillName} - {skill.proficiency}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Personal Projects</Card.Title>
                {cv.personalProjects.map((project, index) => (
                  <Card key={index} className="mb-2">
                    <Card.Body>
                      <Card.Title>{project.name}</Card.Title>
                      <Card.Text>{project.description}</Card.Text>
                      <Card.Link href={project.projectLink} target="_blank">
                        View Project
                      </Card.Link>
                    </Card.Body>
                  </Card>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ModernTheme;
