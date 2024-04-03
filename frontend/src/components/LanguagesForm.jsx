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
    <>
      {languages.map((language, index) => (
        <Row key={index} className="mb-3 align-items-center">
          <Col xs={12} md={5}>
            <Form.Control
              type="text"
              name="languageName"
              value={language.languageName}
              onChange={(e) => handleChange(index, e)}
              placeholder="Language"
              required
            />
          </Col>
          <Col xs={12} md={5}>
            <Form.Select
              name="grade"
              value={language.grade}
              onChange={(e) => handleChange(index, e)}
              required
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
          <Col xs={12} md={2}>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleRemoveLanguage(index)}
            >
              Remove
            </Button>
          </Col>
        </Row>
      ))}
      <Button onClick={handleAddLanguage} className="mt-3">
        Add Language
      </Button>
    </>
  );
};

export default LanguagesForm;
