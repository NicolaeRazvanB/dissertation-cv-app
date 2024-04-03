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
    <>
      {skills.map((skill, index) => (
        <Row key={index} className="mb-3 align-items-center">
          <Col xs={12} md={5}>
            <Form.Control
              type="text"
              name="skillName"
              value={skill.skillName}
              onChange={(e) => handleChange(index, e)}
              placeholder="Skill Name"
              required
            />
          </Col>
          <Col xs={12} md={5}>
            <Form.Control
              type="text"
              name="proficiency"
              value={skill.proficiency}
              onChange={(e) => handleChange(index, e)}
              placeholder="Proficiency (optional)"
            />
          </Col>
          <Col xs={12} md={2}>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleRemoveSkill(index)}
            >
              Remove
            </Button>
          </Col>
        </Row>
      ))}
      <Button onClick={handleAddSkill} className="mt-3">
        Add Skill
      </Button>
    </>
  );
};

export default SkillsForm;
