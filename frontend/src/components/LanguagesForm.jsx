import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const LanguagesForm = ({ languages, setLanguages }) => {
  // Handle changes to language fields
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLanguages = languages.map((lang, langIndex) =>
      index === langIndex ? { ...lang, [name]: value } : lang
    );
    setLanguages(updatedLanguages);
  };

  // Add a new language entry
  const handleAddLanguage = () => {
    setLanguages([...languages, { languageName: "", grade: "" }]);
  };

  // Remove a language entry
  const handleRemoveLanguage = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Languages</h2>
      <Form style={styles.form}>
        {languages.map((language, index) => (
          <Row
            key={index}
            className="mb-3 align-items-center"
            style={styles.row}
          >
            <Col xs={12} md={5}>
              <Form.Control
                type="text"
                name="languageName"
                value={language.languageName}
                onChange={(e) => handleChange(index, e)}
                placeholder="Language"
                required
                style={styles.input}
              />
            </Col>
            <Col xs={12} md={5}>
              <Form.Select
                name="grade"
                value={language.grade}
                onChange={(e) => handleChange(index, e)}
                required
                style={styles.input}
              >
                <option value="">Select proficiency</option>
                <option value="A1">A1 - Beginner</option>
                <option value="A2">A2 - Elementary</option>
                <option value="B1">B1 - Intermediate</option>
                <option value="B2">B2 - Upper Intermediate</option>
                <option value="C1">C1 - Advanced</option>
                <option value="C2">C2 - Proficient</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={2} className="text-md-right">
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveLanguage(index)}
                style={styles.removeButton}
              >
                Remove
              </Button>
            </Col>
          </Row>
        ))}
        <div style={styles.buttonContainer}>
          <Button onClick={handleAddLanguage} style={styles.addButton}>
            Add Language
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

export default LanguagesForm;
