import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const CertificationsForm = ({ certifications, setCertifications }) => {
  // Handle changes to certification fields
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCertifications = certifications.map((cert, certIndex) =>
      index === certIndex ? { ...cert, [name]: value } : cert
    );
    setCertifications(updatedCertifications);
  };

  // Add a new certification entry
  const handleAddCertification = () => {
    setCertifications([...certifications, { name: "", dateObtained: "" }]);
  };

  // Remove a certification entry
  const handleRemoveCertification = (index) => {
    const updatedCertifications = [...certifications];
    updatedCertifications.splice(index, 1);
    setCertifications(updatedCertifications);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Certifications</h2>
      <Form style={styles.form}>
        {certifications.map((certification, index) => (
          <Row
            key={index}
            className="mb-3 align-items-center"
            style={styles.row}
          >
            <Col xs={12} md={5}>
              <Form.Control
                type="text"
                name="name"
                value={certification.name}
                onChange={(e) => handleChange(index, e)}
                placeholder="Certification Name"
                required
                style={styles.input}
              />
            </Col>
            <Col xs={12} md={5}>
              <Form.Control
                type="date"
                name="dateObtained"
                value={certification.dateObtained}
                onChange={(e) => handleChange(index, e)}
                placeholder="Date Obtained"
                required
                style={styles.input}
              />
            </Col>
            <Col xs={12} md={2} className="text-md-right">
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveCertification(index)}
                style={styles.removeButton}
              >
                Remove
              </Button>
            </Col>
          </Row>
        ))}
        <div style={styles.buttonContainer}>
          <Button onClick={handleAddCertification} style={styles.addButton}>
            Add Certification
          </Button>
        </div>
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
  row: {
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderRadius: "10px",
    borderColor: "#ced4da",
    padding: "10px",
    fontSize: "1rem",
  },
  buttonContainer: {
    textAlign: "center",
    marginTop: "20px",
  },
  addButton: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  removeButton: {
    width: "100%",
  },
};

export default CertificationsForm;
