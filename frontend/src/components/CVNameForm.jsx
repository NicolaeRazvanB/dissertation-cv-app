import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { base_url, requestOptions } from "../requestOptions";
const CVNameForm = ({ cvName, setCvName, setImageFile, currentImage }) => {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (currentImage) {
          const response = await fetch(
            `${base_url}api/image/${currentImage}`,
            requestOptions
          );
          if (response.ok) {
            const imageData = await response.blob();
            setPreview(URL.createObjectURL(imageData));
          }
        }
      } catch (error) {
        console.error("Failed to fetch image:", error);
      }
    };

    fetchImage();

    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [currentImage]);

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
      {/* {currentImage && (
        <div className="mb-3">
          <Form.Label>Current Photo</Form.Label>
          <div>
            <img
              src={preview}
              alt="Current Preview"
              style={{ width: "100px", height: "auto" }}
            />
          </div>
        </div>
      )} */}
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
