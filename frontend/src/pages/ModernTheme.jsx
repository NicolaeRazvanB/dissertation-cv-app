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
    <>
      <NavbarComponent />
      <div style={styles.background}>
        <Container className="mt-5">
          <Row className="justify-content-center">
            <Col md={8}>
              {photoUrl && (
                <div style={styles.photoContainer}>
                  <Card.Img
                    variant="top"
                    src={photoUrl}
                    alt="CV Photo"
                    style={styles.photo}
                  />
                </div>
              )}
              <Card
                className="mb-4"
                style={{ ...styles.card, ...styles.glass }}
              >
                <Card.Body>
                  <Card.Title className="text-center mb-3" style={styles.title}>
                    Hello, I am {cv.personalInfo.firstName}{" "}
                    {cv.personalInfo.lastName}
                  </Card.Title>

                  <Card.Text style={styles.text}>
                    You can reach me via email at {cv.personalInfo.email} or
                    call me at {cv.personalInfo.phoneNumber}.
                  </Card.Text>
                  <Card.Text style={styles.text}>
                    You can also connect with me on{" "}
                    <a
                      href={cv.personalInfo.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.link}
                    >
                      LinkedIn
                    </a>
                    .
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card
                className="mb-4"
                style={{ ...styles.card, ...styles.glass }}
              >
                <Card.Body>
                  <Card.Title style={styles.title}>About Me</Card.Title>
                  <Card.Text style={styles.text}>{cv.about}</Card.Text>
                </Card.Body>
              </Card>

              <Card
                className="mb-4"
                style={{ ...styles.card, ...styles.glass }}
              >
                <Card.Body>
                  <Card.Title style={styles.title}>Education</Card.Title>
                  <ListGroup variant="flush">
                    {cv.education.map((edu, index) => (
                      <ListGroupItem key={index} style={styles.listItem}>
                        {edu.schoolName}, {edu.degree} in {edu.fieldOfStudy} (
                        {new Date(edu.startDate).getFullYear()} -{" "}
                        {new Date(edu.endDate).getFullYear()})
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>

              <Card
                className="mb-4"
                style={{ ...styles.card, ...styles.glass }}
              >
                <Card.Body>
                  <Card.Title style={styles.title}>Work Experience</Card.Title>
                  {cv.technicalExperience.map((exp, index) => (
                    <Card key={index} className="mb-2" style={styles.cardInner}>
                      <Card.Body>
                        <Card.Title style={styles.title}>
                          {exp.position} at {exp.companyName}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {new Date(exp.startDate).toLocaleDateString()} -{" "}
                          {new Date(exp.endDate).toLocaleDateString()}
                        </Card.Subtitle>
                        <Card.Text style={styles.text}>
                          {exp.description}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </Card.Body>
              </Card>

              <Card
                className="mb-4"
                style={{ ...styles.card, ...styles.glass }}
              >
                <Card.Body>
                  <Card.Title style={styles.title}>Certifications</Card.Title>
                  <ListGroup variant="flush">
                    {cv.certifications.map((cert, index) => (
                      <ListGroupItem key={index} style={styles.listItem}>
                        {cert.name} (Obtained:{" "}
                        {new Date(cert.dateObtained).toLocaleDateString()})
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>

              <Card
                className="mb-4"
                style={{ ...styles.card, ...styles.glass }}
              >
                <Card.Body>
                  <Card.Title style={styles.title}>Skills</Card.Title>
                  <ListGroup variant="flush">
                    {cv.skills.map((skill, index) => (
                      <ListGroupItem key={index} style={styles.listItem}>
                        {skill.skillName} - {skill.proficiency}
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>

              <Card
                className="mb-4"
                style={{ ...styles.card, ...styles.glass }}
              >
                <Card.Body>
                  <Card.Title style={styles.title}>
                    Personal Projects
                  </Card.Title>
                  {cv.personalProjects.map((project, index) => (
                    <Card key={index} className="mb-2" style={styles.cardInner}>
                      <Card.Body>
                        <Card.Title style={styles.title}>
                          {project.name}
                        </Card.Title>
                        <Card.Text style={styles.text}>
                          {project.description}
                        </Card.Text>
                        <Card.Link
                          href={project.projectLink}
                          target="_blank"
                          style={styles.link}
                        >
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
    </>
  );
};

const styles = {
  background: {
    backgroundImage:
      "url('https://source.unsplash.com/random/1920x1080?nature')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    padding: "20px",
    color: "#fff",
  },
  photoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  photo: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    marginBottom: "20px",
    border: "5px solid white",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  card: {
    borderRadius: "15px",
    background: "rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    color: "#fff",
  },
  cardInner: {
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#fff",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: "10px",
  },
  text: {
    fontSize: "1rem",
    color: "#fff",
    textAlign: "center",
  },
  listItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
  },
  link: {
    color: "#40E0D0",
    textDecoration: "none",
  },
};

export default ModernTheme;
