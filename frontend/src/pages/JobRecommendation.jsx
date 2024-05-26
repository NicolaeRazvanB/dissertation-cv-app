import React, { useState } from "react";
import {
  Form,
  Button,
  Spinner,
  Container,
  Row,
  Col,
  Card,
  Badge,
} from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";
import { requestOptions, base_url } from "../requestOptions";

const JobRecommendation = () => {
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [jobs, setJobs] = useState([]);
  const [jobCount, setJobCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${base_url}api/run-scraper`, {
        ...requestOptions,
        method: "POST",
        body: JSON.stringify({
          skills,
          location,
          title,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setJobs(data.jobs);
      setJobCount(data.count);
    } catch (err) {
      setError("Failed to fetch job recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div style={styles.background}>
        <Container className="job-recommendation mt-5" style={styles.container}>
          <h2 className="text-center my-4" style={styles.heading}>
            Are you a developer? Try out our new job recommendation feature
          </h2>
          <Form onSubmit={handleSubmit} style={styles.form}>
            <Form.Group controlId="formSkills">
              <Form.Label>Skills</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Enter a skill"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                />
                <Button
                  variant="secondary"
                  onClick={handleAddSkill}
                  className="ms-2"
                >
                  Add
                </Button>
              </div>
              <div className="mt-2">
                {skills.map((skill, index) => (
                  <Badge key={index} bg="primary" className="me-1">
                    {skill}{" "}
                    <span
                      onClick={() => handleRemoveSkill(skill)}
                      style={{ cursor: "pointer" }}
                    >
                      x
                    </span>
                  </Badge>
                ))}
              </div>
            </Form.Group>
            <Form.Group controlId="formLocation" className="mt-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formTitle" className="mt-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <div className="text-center mt-3">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Get Recommendations"
                )}
              </Button>
            </div>
          </Form>
          {error && <p className="text-danger mt-3 text-center">{error}</p>}
          <div className="job-results mt-4">
            <h2 className="text-center">
              {loading
                ? "Searching for your new job offers, this might take a few minutes"
                : `${jobCount} Jobs Found`}
            </h2>
            <Row>
              {jobs.map((job, index) => (
                <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                  <Card className="job-card h-100" style={styles.card}>
                    <Card.Body>
                      <Card.Title>{job.title}</Card.Title>
                      <Card.Text>
                        <strong>Company:</strong> {job.company}
                      </Card.Text>
                      <Card.Text>
                        <strong>Location:</strong> {job.location}
                      </Card.Text>
                      <Card.Text>
                        <strong>Salary:</strong> {job.salary}
                      </Card.Text>
                      <Card.Text>
                        <strong>Technologies:</strong>{" "}
                        {job.technologies.join(", ")}
                      </Card.Text>
                      <Card.Link href={job.url} target="_blank">
                        View Job
                      </Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

const styles = {
  background: {
    backgroundColor: "#e0e7ff", // Inverted background color
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    minHeight: "100vh",
  },
  container: {
    backgroundColor: "#fff", // Inverted container color
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    maxWidth: "1000px", // Increased max-width
    margin: "0 auto",
  },
  heading: {
    color: "#333",
    fontSize: "2rem",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  form: {
    marginBottom: "20px",
  },
  card: {
    color: "#333",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
  },
};

export default JobRecommendation;
