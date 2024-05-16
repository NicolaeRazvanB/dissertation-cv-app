import React, { useRef } from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import { Button, Card, Container } from "react-bootstrap";

const BusinessCardGenerator = ({ cv, cvPhotoUrl, qrCodeUrl }) => {
  const pdfExportComponent = useRef(null);

  const handleExportWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  return (
    <Container className="mt-5">
      <Button onClick={handleExportWithComponent} className="mb-3">
        Download Business Card as PDF
      </Button>
      <PDFExport
        ref={pdfExportComponent}
        paperSize="A4"
        margin="1cm"
        scale={0.5}
      >
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <div style={{ textAlign: "center" }}>
              {cvPhotoUrl && (
                <img
                  src={cvPhotoUrl}
                  alt="CV Photo"
                  style={{
                    width: "3rem",
                    height: "3rem",
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginBottom: "10px",
                  }}
                />
              )}
              <Card.Title>
                {cv.personalInfo.firstName} {cv.personalInfo.lastName}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {cv.personalInfo.email}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">
                {cv.personalInfo.phoneNumber}
              </Card.Subtitle>
              <Card.Text style={{ fontSize: "0.85rem" }}>{cv.about}</Card.Text>
              {qrCodeUrl && (
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  style={{
                    width: "5rem",
                    height: "5rem",
                    marginTop: "10px",
                  }}
                />
              )}
            </div>
          </Card.Body>
        </Card>
      </PDFExport>
    </Container>
  );
};

export default BusinessCardGenerator;
