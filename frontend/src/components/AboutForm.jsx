import React from "react";
import { Form } from "react-bootstrap";

const AboutForm = ({ about, setAbout }) => {
  return (
    <Form.Group className="mb-3" style={styles.formGroup}>
      <div style={styles.textareaContainer}>
        <div style={styles.labelContainer}>
          <Form.Label style={styles.label}>About Me</Form.Label>
        </div>
        <Form.Control
          as="textarea"
          rows={3}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Write a short summary about yourself"
          style={styles.textarea}
        />
      </div>
    </Form.Group>
  );
};

const styles = {
  formGroup: {
    marginTop: "10px",
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
  textareaContainer: {
    width: "100%",
    maxWidth: "800px",
    borderRadius: "15px",
    padding: "20px",
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(230, 230, 250, 0.8))",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
  },
  textarea: {
    width: "100%",
    borderRadius: "10px",
    borderColor: "#ced4da",
    padding: "10px",
    fontSize: "1rem",
    resize: "none",
  },
};

export default AboutForm;
