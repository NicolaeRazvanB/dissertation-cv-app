import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const EducationForm = ({ education, setEducation }) => {
  // Function to handle change in any of the education fields
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = education.map((edu, eduIndex) =>
      index === eduIndex ? { ...edu, [name]: value } : edu
    );
    setEducation(newEducation);
  };

  // Function to add a new education entry
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

  // Function to remove an education entry
  const handleRemoveEducation = (index) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    setEducation(newEducation);
  };

  return (
    <>
      {education.map((edu, index) => (
        <Row key={index} className="mb-3 align-items-center">
          <Col xs={2}>
            <Form.Control
              type="text"
              name="schoolName"
              value={edu.schoolName}
              onChange={(e) => handleChange(index, e)}
              placeholder="School Name"
              required
            />
          </Col>
          <Col xs={2}>
            <Form.Control
              type="text"
              name="degree"
              value={edu.degree}
              onChange={(e) => handleChange(index, e)}
              placeholder="Degree"
              required
            />
          </Col>
          <Col xs={2}>
            <Form.Control
              type="text"
              name="fieldOfStudy"
              value={edu.fieldOfStudy}
              onChange={(e) => handleChange(index, e)}
              placeholder="Field of Study"
              required
            />
          </Col>
          <Col xs={2}>
            <Form.Control
              type="date"
              name="startDate"
              value={edu.startDate}
              onChange={(e) => handleChange(index, e)}
              placeholder="Start Date"
            />
          </Col>
          <Col xs={2}>
            <Form.Control
              type="date"
              name="endDate"
              value={edu.endDate}
              onChange={(e) => handleChange(index, e)}
              placeholder="End Date"
            />
          </Col>
          <Col xs={2}>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleRemoveEducation(index)}
            >
              Remove
            </Button>
          </Col>
        </Row>
      ))}
      <Button onClick={handleAddEducation} className="mt-3">
        Add Education
      </Button>
      <br></br>
    </>
  );
};

export default EducationForm;
