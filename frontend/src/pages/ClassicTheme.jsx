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
import "./ClassicTheme.css"; // Import the CSS file for styling
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
const ClassicTheme = ({ cv, photoUrl }) => {
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };
  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#0d47a1",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  );
  if (!cv) {
    return <div className="text-center">Apologies, no CV found.</div>;
  }
  if (init) {
    return (
      <>
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
        <NavbarComponent />
        <div className="professional-dark-theme">
          <Container className="mt-5">
            <Row className="justify-content-center">
              <Col md={8}>
                {photoUrl && (
                  <div className="photo-container">
                    <Card.Img
                      variant="top"
                      src={photoUrl}
                      alt="CV Photo"
                      className="photo"
                    />
                  </div>
                )}
                <Card className="glass-card">
                  <Card.Body>
                    <Card.Title className="text-center mb-3 title">
                      Welcome! My name is {cv.personalInfo.firstName}{" "}
                      {cv.personalInfo.lastName}
                    </Card.Title>
                    <Card.Text className="text">
                      You may contact me via email at {cv.personalInfo.email} or
                      reach me by phone at {cv.personalInfo.phoneNumber}.
                    </Card.Text>
                    <Card.Text className="text">
                      Feel free to connect with me on{" "}
                      <a
                        href={cv.personalInfo.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link"
                      >
                        LinkedIn
                      </a>
                      .
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card className="glass-card">
                  <Card.Body>
                    <Card.Title className="title">Introduction</Card.Title>
                    <Card.Text className="text">{cv.about}</Card.Text>
                  </Card.Body>
                </Card>

                <Card className="glass-card">
                  <Card.Body>
                    <Card.Title className="title">Education</Card.Title>
                    <ListGroup variant="flush">
                      {cv.education.map((edu, index) => (
                        <ListGroupItem key={index} className="list-item">
                          {edu.degree} in {edu.fieldOfStudy} from{" "}
                          {edu.schoolName} (
                          {new Date(edu.startDate).getFullYear()} -{" "}
                          {new Date(edu.endDate).getFullYear()})
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>

                <Card className="glass-card">
                  <Card.Body>
                    <Card.Title className="title">
                      Professional Experience
                    </Card.Title>
                    {cv.technicalExperience.map((exp, index) => (
                      <Card key={index} className="mb-2 glass-card-inner">
                        <Card.Body>
                          <Card.Title className="title">
                            {exp.position} at {exp.companyName}
                          </Card.Title>
                          <Card.Subtitle className="mb-2 text-muted subtitle">
                            {new Date(exp.startDate).toLocaleDateString()} -{" "}
                            {new Date(exp.endDate).toLocaleDateString()}
                          </Card.Subtitle>
                          <Card.Text className="text">
                            {exp.description}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    ))}
                  </Card.Body>
                </Card>

                <Card className="glass-card">
                  <Card.Body>
                    <Card.Title className="title">Certifications</Card.Title>
                    <ListGroup variant="flush">
                      {cv.certifications.map((cert, index) => (
                        <ListGroupItem key={index} className="list-item">
                          {cert.name} (Issued:{" "}
                          {new Date(cert.dateObtained).toLocaleDateString()})
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>

                <Card className="glass-card">
                  <Card.Body>
                    <Card.Title className="title">
                      Skills & Proficiencies
                    </Card.Title>
                    <ListGroup variant="flush">
                      {cv.skills.map((skill, index) => (
                        <ListGroupItem key={index} className="list-item">
                          {skill.skillName} - {skill.proficiency}
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>

                <Card className="glass-card">
                  <Card.Body>
                    <Card.Title className="title">Personal Projects</Card.Title>
                    {cv.personalProjects.map((project, index) => (
                      <Card key={index} className="mb-2 glass-card-inner">
                        <Card.Body>
                          <Card.Title className="title">
                            {project.name}
                          </Card.Title>
                          <Card.Text className="text">
                            {project.description}
                          </Card.Text>
                          <Card.Link
                            href={project.projectLink}
                            target="_blank"
                            className="link"
                            style={{
                              backgroundColor: "white",
                              padding: "8px",
                              borderRadius: "3px",
                            }}
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
  }
};

export default ClassicTheme;
