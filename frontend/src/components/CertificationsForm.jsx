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
    <>
      {certifications.map((certification, index) => (
        <Row key={index} className="mb-3 align-items-center">
          <Col xs={12} md={5}>
            <Form.Control
              type="text"
              name="name"
              value={certification.name}
              onChange={(e) => handleChange(index, e)}
              placeholder="Certification Name"
              required
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
            />
          </Col>
          <Col xs={12} md={2}>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleRemoveCertification(index)}
            >
              Remove
            </Button>
          </Col>
        </Row>
      ))}
      <Button onClick={handleAddCertification} className="mt-3">
        Add Certification
      </Button>
    </>
  );
};

export default CertificationsForm;
