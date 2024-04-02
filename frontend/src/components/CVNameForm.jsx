import React from "react";
import { Form } from "react-bootstrap";

const CVNameForm = ({ cvName, setCvName }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>CV Name</Form.Label>
      <Form.Control
        className="w-50"
        type="text"
        value={cvName}
        onChange={(e) => setCvName(e.target.value)}
        placeholder="Enter CV name/title"
        required
      />
    </Form.Group>
  );
};

export default CVNameForm;
