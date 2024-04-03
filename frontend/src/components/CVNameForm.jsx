import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

const CVNameForm = ({ cvName, setCvName, setImageFile }) => {
  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Pass the selected file up to the parent component
      setPreview(URL.createObjectURL(file));
    } else {
      setImageFile(null); // Clear the selected file in the parent component
      setPreview("");
    }
  };

  useEffect(() => {
    // Clean up the preview URL to avoid memory leaks
    return () => preview && URL.revokeObjectURL(preview);
  }, [preview]);

  return (
    <>
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
      <Form.Group className="mb-3">
        <Form.Label>Upload Photo</Form.Label>
        <Form.Control
          className="w-50"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
        />
        {preview && (
          <div className="mt-3">
            <img
              src={preview}
              alt="Preview"
              style={{ width: "100px", height: "auto" }}
            />
          </div>
        )}
      </Form.Group>
    </>
  );
};

export default CVNameForm;
