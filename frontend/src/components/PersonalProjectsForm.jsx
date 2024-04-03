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
    <>
      {personalProjects.map((project, index) => (
        <Row key={index} className="mb-3 align-items-center">
          <Col xs={12} md={3}>
            <Form.Control
              type="text"
              name="name"
              value={project.name}
              onChange={(e) => handleChange(index, e)}
              placeholder="Project Name"
              required
            />
          </Col>
          <Col xs={12} md={5}>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={project.description}
              onChange={(e) => handleChange(index, e)}
              placeholder="Description"
              required
            />
          </Col>
          <Col xs={12} md={3}>
            <Form.Control
              type="text"
              name="projectLink"
              value={project.projectLink}
              onChange={(e) => handleChange(index, e)}
              placeholder="Project Link (optional)"
            />
          </Col>
          <Col xs={12} md={1}>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleRemoveProject(index)}
            >
              Remove
            </Button>
          </Col>
        </Row>
      ))}
      <Button onClick={handleAddProject} className="mt-3">
        Add Project
      </Button>
    </>
  );
};

export default PersonalProjectsForm;
