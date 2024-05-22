import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const SkillsForm = ({ skills, setSkills }) => {
  // Handle changes to skill fields
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSkills = skills.map((skill, skillIndex) =>
      index === skillIndex ? { ...skill, [name]: value } : skill
    );
    setSkills(updatedSkills);
  };

  // Add a new skill entry
  const handleAddSkill = () => {
    setSkills([...skills, { skillName: "", proficiency: "" }]);
  };

  // Remove a skill entry
  const handleRemoveSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Skills</h2>
      <Form style={styles.form}>
        {skills.map((skill, index) => (
          <Row
            key={index}
            className="mb-3 align-items-center"
            style={styles.row}
          >
            <Col xs={12} md={5}>
              <Form.Control
                type="text"
                name="skillName"
                value={skill.skillName}
                onChange={(e) => handleChange(index, e)}
                placeholder="Skill Name"
                required
                style={styles.input}
              />
            </Col>
            <Col xs={12} md={5}>
              <Form.Control
                type="text"
                name="proficiency"
                value={skill.proficiency}
                onChange={(e) => handleChange(index, e)}
                placeholder="Proficiency (optional)"
                style={styles.input}
              />
            </Col>
            <Col xs={12} md={2} className="text-md-right">
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveSkill(index)}
                style={styles.removeButton}
              >
                Remove
              </Button>
            </Col>
          </Row>
        ))}
        <div style={styles.buttonContainer}>
          <Button onClick={handleAddSkill} style={styles.addButton}>
            Add Skill
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

export default SkillsForm;
