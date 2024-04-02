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
    <>
      {technicalExperience.map((experience, index) => (
        <Row key={index} className="mb-3 align-items-center">
          <Col xs={12} md={7}>
            <Row>
              <Col xs={6} md={3}>
                <Form.Control
                  type="text"
                  name="companyName"
                  value={experience.companyName}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Company Name"
                  required
                />
              </Col>
              <Col xs={6} md={3}>
                <Form.Control
                  type="text"
                  name="position"
                  value={experience.position}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Position"
                  required
                />
              </Col>
              {/* Start and End Dates should be inside their own Col */}
              <Col xs={6} md={3}>
                <Form.Label className="d-block">Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={experience.startDate}
                  onChange={(e) => handleChange(index, e)}
                />
              </Col>
              <Col xs={6} md={3}>
                <Form.Label className="d-block">End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={experience.endDate}
                  onChange={(e) => handleChange(index, e)}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={4}>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={experience.description}
              onChange={(e) => handleChange(index, e)}
              placeholder="Description"
            />
          </Col>
          <Col xs={12} md={1}>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleRemoveExperience(index)}
            >
              Remove
            </Button>
          </Col>
        </Row>
      ))}
      <Button onClick={handleAddExperience} className="mt-3">
        Add Experience
      </Button>
    </>
  );
};

export default TechnicalExperienceForm;
