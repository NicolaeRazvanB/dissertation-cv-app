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
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setPreview("");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>CV Information</h2>
      <Form style={styles.form}>
        <Form.Group className="mb-3" style={styles.formGroup}>
          <div style={styles.labelContainer}>
            <Form.Label style={styles.label}>CV Name</Form.Label>
          </div>
          <Form.Control
            type="text"
            value={cvName}
            onChange={(e) => setCvName(e.target.value)}
            placeholder="Enter CV name/title"
            required
            style={styles.input}
          />
        </Form.Group>
        <Form.Group className="mb-3" style={styles.formGroup}>
          <div style={styles.labelContainer}>
            <Form.Label style={styles.label}>Upload Photo</Form.Label>
          </div>
          <Form.Control
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            style={styles.input}
          />
          {preview && (
            <div style={styles.previewContainer}>
              <img src={preview} alt="Preview" style={styles.previewImage} />
            </div>
          )}
        </Form.Group>
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
    maxWidth: "800px",
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
  formGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  labelContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  label: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    maxWidth: "400px",
    borderRadius: "10px",
    borderColor: "#ced4da",
    padding: "10px",
    fontSize: "1rem",
  },
  previewContainer: {
    marginTop: "10px",
    textAlign: "center",
  },
  previewImage: {
    width: "100px",
    height: "auto",
    borderRadius: "10px",
  },
};

export default CVNameForm;
