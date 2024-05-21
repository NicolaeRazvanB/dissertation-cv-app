import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const PersonalInfoForm = ({ personalInfo, setPersonalInfo }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Personal Information</h2>
      <Form style={styles.form}>
        <Row style={styles.row}>
          <Col md={6} style={styles.col}>
            <Form.Group className="mb-3" style={styles.formGroup}>
              <Form.Label style={styles.label}>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={personalInfo.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                required
                style={styles.input}
              />
            </Form.Group>
          </Col>
          <Col md={6} style={styles.col}>
            <Form.Group className="mb-3" style={styles.formGroup}>
              <Form.Label style={styles.label}>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={personalInfo.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                required
                style={styles.input}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row style={styles.row}>
          <Col md={6} style={styles.col}>
            <Form.Group className="mb-3" style={styles.formGroup}>
              <Form.Label style={styles.label}>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={personalInfo.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
                style={styles.input}
              />
            </Form.Group>
          </Col>
          <Col md={6} style={styles.col}>
            <Form.Group className="mb-3" style={styles.formGroup}>
              <Form.Label style={styles.label}>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={personalInfo.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
                style={styles.input}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row style={styles.row}>
          <Col md={6} style={styles.col}>
            <Form.Group className="mb-3" style={styles.formGroup}>
              <Form.Label style={styles.label}>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={personalInfo.address}
                onChange={handleChange}
                placeholder="Enter address"
                style={styles.input}
              />
            </Form.Group>
          </Col>
          <Col md={6} style={styles.col}>
            <Form.Group className="mb-3" style={styles.formGroup}>
              <Form.Label style={styles.label}>LinkedIn</Form.Label>
              <Form.Control
                type="text"
                name="linkedIn"
                value={personalInfo.linkedIn}
                onChange={handleChange}
                placeholder="Enter LinkedIn profile URL"
                style={styles.input}
              />
            </Form.Group>
          </Col>
        </Row>
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
    display: "flex",
    justifyContent: "center",
    marginBottom: "15px",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formGroup: {
    width: "100%",
    maxWidth: "400px",
  },
  label: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  input: {
    borderRadius: "10px",
    borderColor: "#ced4da",
    padding: "10px",
    fontSize: "1rem",
  },
};

export default PersonalInfoForm;
