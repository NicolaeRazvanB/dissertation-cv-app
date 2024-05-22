import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const EducationForm = ({ education, setEducation }) => {
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = education.map((edu, eduIndex) =>
      index === eduIndex ? { ...edu, [name]: value } : edu
    );
    setEducation(newEducation);
  };

  const handleAddEducation = () => {
    setEducation([
      ...education,
      {
        schoolName: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const handleRemoveEducation = (index) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    setEducation(newEducation);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Education</h2>
      <Form style={styles.form}>
        {education.map((edu, index) => (
          <Row
            key={index}
            className="mb-3 align-items-center"
            style={styles.row}
          >
            <Col xs={12} md={2} className="mb-2 mb-md-0">
              <Form.Control
                type="text"
                name="schoolName"
                value={edu.schoolName}
                onChange={(e) => handleChange(index, e)}
                placeholder="School Name"
                required
                style={styles.input}
              />
            </Col>
            <Col xs={12} md={2} className="mb-2 mb-md-0">
              <Form.Control
                type="text"
                name="degree"
                value={edu.degree}
                onChange={(e) => handleChange(index, e)}
                placeholder="Degree"
                required
                style={styles.input}
              />
            </Col>
            <Col xs={12} md={2} className="mb-2 mb-md-0">
              <Form.Control
                type="text"
                name="fieldOfStudy"
                value={edu.fieldOfStudy}
                onChange={(e) => handleChange(index, e)}
                placeholder="Field of Study"
                required
                style={styles.input}
              />
            </Col>
            <Col xs={12} md={2} className="mb-2 mb-md-0">
              <Form.Control
                type="date"
                name="startDate"
                value={edu.startDate}
                onChange={(e) => handleChange(index, e)}
                placeholder="Start Date"
                style={styles.input}
              />
            </Col>
            <Col xs={12} md={2} className="mb-2 mb-md-0">
              <Form.Control
                type="date"
                name="endDate"
                value={edu.endDate}
                onChange={(e) => handleChange(index, e)}
                placeholder="End Date"
                style={styles.input}
              />
            </Col>
            <Col xs={12} md={2} className="text-md-right">
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveEducation(index)}
                style={styles.button}
              >
                Remove
              </Button>
            </Col>
          </Row>
        ))}
        <div style={styles.buttonContainer}>
          <Button onClick={handleAddEducation} style={styles.addButton}>
            Add Education
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
  input: {
    width: "110%",
    borderRadius: "10px",
    borderColor: "#ced4da",
    padding: "3px",
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
  button: {
    width: "100%",
  },
};

export default EducationForm;
