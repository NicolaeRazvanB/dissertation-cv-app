import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const PersonalProjectsForm = ({ personalProjects, setPersonalProjects }) => {
  // Handle field changes
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = personalProjects.map((project, projIndex) =>
      index === projIndex ? { ...project, [name]: value } : project
    );
    setPersonalProjects(updatedProjects);
  };

  // Add new project entry
  const handleAddProject = () => {
    setPersonalProjects([
      ...personalProjects,
      { name: "", description: "", projectLink: "" },
    ]);
  };

  // Remove a project entry
  const handleRemoveProject = (index) => {
    const updatedProjects = [...personalProjects];
    updatedProjects.splice(index, 1);
    setPersonalProjects(updatedProjects);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Personal Projects</h2>
      <Form style={styles.form}>
        {personalProjects.map((project, index) => (
          <Row
            key={index}
            className="mb-3 align-items-center"
            style={styles.row}
          >
            <Col xs={12} md={3}>
              <Form.Control
                type="text"
                name="name"
                value={project.name}
                onChange={(e) => handleChange(index, e)}
                placeholder="Project Name"
                required
                style={styles.input}
              />{" "}
              <br></br>
              <Form.Control
                type="text"
                name="projectLink"
                value={project.projectLink}
                onChange={(e) => handleChange(index, e)}
                placeholder="Project Link (optional)"
                style={styles.input}
              />
            </Col>
            <Col xs={12} md={7}>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={project.description}
                onChange={(e) => handleChange(index, e)}
                placeholder="Description"
                required
                style={styles.textarea}
              />
            </Col>

            <Col xs={12} md={1} className="text-md-right">
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveProject(index)}
                style={styles.removeButton}
              >
                Remove
              </Button>
            </Col>
          </Row>
        ))}
        <div style={styles.buttonContainer}>
          <Button onClick={handleAddProject} style={styles.addButton}>
            Add Project
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
    width: "140%",
  },
};

export default PersonalProjectsForm;
