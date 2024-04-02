import React from "react";
import { Form } from "react-bootstrap";

const AboutForm = ({ about, setAbout }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>About Me</Form.Label>
      <Form.Control
        className="w-50"
        as="textarea"
        rows={3}
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        placeholder="Write a short summary about yourself"
      />
    </Form.Group>
  );
};

export default AboutForm;
