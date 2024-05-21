import React, { useRef } from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import { Button, Card, Container } from "react-bootstrap";

const BusinessCardGenerator = ({ cv, cvPhotoUrl, qrCodeUrl, cardStyle }) => {
  const pdfExportComponent = useRef(null);

  const handleExportWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  return (
    <Container className="mt-5">
      {cv && (
        <>
          <PDFExport
            ref={pdfExportComponent}
            paperSize="A4"
            margin="1cm"
            scale={0.5}
          >
            <Card
              style={{
                ...cardStyle,
                backgroundColor: "#000", // Black background
                color: "#fff", // White text
                margin: "0 auto",
              }}
            >
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
                  <Card.Title style={{ color: "#fff" }}>
                    {cv.personalInfo.firstName} {cv.personalInfo.lastName}
                  </Card.Title>
                  <Card.Subtitle className="mb-2" style={{ color: "#ccc" }}>
                    {cv.personalInfo.email}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2" style={{ color: "#ccc" }}>
                    {cv.personalInfo.phoneNumber}
                  </Card.Subtitle>
                  <Card.Text style={{ fontSize: "0.85rem", color: "#ccc" }}>
                    {cv.about}
                  </Card.Text>
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
          <Button
            onClick={handleExportWithComponent}
            className="mt-3"
            style={{ display: "block", margin: "0 auto", marginBottom: "3px" }}
          >
            Download Business Card as PDF
          </Button>
        </>
      )}
    </Container>
  );
};

export default BusinessCardGenerator;
