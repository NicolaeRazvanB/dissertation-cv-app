import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const TechnicalExperienceForm = ({
  technicalExperience,
  setTechnicalExperience,
}) => {
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperiences = technicalExperience.map((exp, expIndex) =>
      index === expIndex ? { ...exp, [name]: value } : exp
    );
    setTechnicalExperience(updatedExperiences);
  };

  const handleAddExperience = () => {
    setTechnicalExperience([
      ...technicalExperience,
      {
        companyName: "",
        position: "",
        description: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const handleRemoveExperience = (index) => {
    const updatedExperiences = [...technicalExperience];
    updatedExperiences.splice(index, 1);
    setTechnicalExperience(updatedExperiences);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Technical Experience</h2>
      <Form style={styles.form}>
        {technicalExperience.map((experience, index) => (
          <Row
            key={index}
            className="mb-3 align-items-center"
            style={styles.row}
          >
            <Col xs={12} md={2}>
              <Form.Control
                type="text"
                name="companyName"
                value={experience.companyName}
                onChange={(e) => handleChange(index, e)}
                placeholder="Company Name"
                required
                style={styles.input}
              />
              <Form.Label className="d-block" style={styles.label}>
                Start Date
              </Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={experience.startDate}
                onChange={(e) => handleChange(index, e)}
                style={styles.input}
              />
            </Col>
            <Col xs={12} md={2}>
              <Form.Control
                type="text"
                name="position"
                value={experience.position}
                onChange={(e) => handleChange(index, e)}
                placeholder="Position"
                required
                style={styles.input}
              />
              <Form.Label className="d-block" style={styles.label}>
                End Date
              </Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={experience.endDate}
                onChange={(e) => handleChange(index, e)}
                style={styles.input}
              />
            </Col>

            <Col xs={12} md={7}>
              <Form.Control
                as="textarea"
                rows={1}
                name="description"
                value={experience.description}
                onChange={(e) => handleChange(index, e)}
                placeholder="Description"
                style={styles.textarea}
              />
            </Col>
            <Col xs={12} md={1} className="text-md-right">
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveExperience(index)}
                style={styles.removeButton}
              >
                Remove
              </Button>
            </Col>
          </Row>
        ))}
        <div style={styles.buttonContainer}>
          <Button onClick={handleAddExperience} style={styles.addButton}>
            Add Experience
          </Button>
        </div>
      </Form>
    </div>
  );
};

const styles = {
  container: {
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(230, 230, 250, 0.8))",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(10px)",
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    marginBottom: "20px",
    width: "100%",
    margin: "auto",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  form: {
    width: "100%",
  },
  row: {
    alignItems: "center",
  },
  label: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "5px",
  },
  input: {
    width: "120%",
    borderRadius: "10px",
    borderColor: "#ced4da",
    padding: "10px",
    fontSize: "1rem",
  },
  textarea: {
    width: "100%",
    borderRadius: "10px",
    borderColor: "#ced4da",
    padding: "10px",
    fontSize: "1rem",
  },
  buttonContainer: {
    textAlign: "center",
    marginTop: "20px",
  },
  addButton: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  removeButton: {
    width: "100%",
  },
};

export default TechnicalExperienceForm;
