import React, { useContext, useState, useEffect, useRef } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { AuthContext } from "../context/AuthContext";
import { requestOptions, base_url } from "../requestOptions";
import { useParams, useNavigate } from "react-router-dom";
import {
  Spinner,
  Button,
  Alert,
  Dropdown,
  Col,
  Row,
  Container,
} from "react-bootstrap";
import { PDFExport } from "@progress/kendo-react-pdf";
import BusinessCardGenerator from "../components/BusinessCardGenerator";
import CVPrintTemplate1 from "./CVPrintTemplate1";
import CVPrintTemplate2 from "./CVPrintTemplate2";

const CV = () => {
  const { userInfo } = useContext(AuthContext);
  const { cvId } = useParams();
  const [cvData, setCvData] = useState(null);
  const [cvPhotoUrl, setCvPhotoUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("Template1");
  const cvRef = useRef();
  const doc = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCvData = async () => {
      setLoading(true);
      try {
        const token = userInfo.token;
        const requestParams = {
          ...requestOptions,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch(
          `${base_url}api/cv/${cvId}`,
          requestParams
        );
        if (!response.ok) throw new Error("Failed to fetch CV data");
        const data = await response.json();
        setCvData(data);

        if (data.photoName && data.photoName !== "") {
          const photoResponse = await fetch(
            `${base_url}api/image/${data.photoName}`,
            requestParams
          );
          if (photoResponse.ok) {
            const blob = await photoResponse.blob();
            const photoUrl = URL.createObjectURL(blob);
            setCvPhotoUrl(photoUrl);
          } else {
            console.error("Failed to fetch CV photo");
          }
        }

        // Fetch QR code URL
        try {
          const qrCodeResponse = await fetch(
            `${base_url}api/qr/${cvId}`,
            requestParams
          );
          if (qrCodeResponse.ok) {
            const qrCodeBlob = await qrCodeResponse.blob();
            const qrCodeUrl = URL.createObjectURL(qrCodeBlob);
            setQrCodeUrl(qrCodeUrl);
          } else {
            console.error("QR code not found for this CV");
          }
        } catch (error) {
          console.error("Failed to fetch QR code");
        }
      } catch (error) {
        console.error("Error fetching CV data:", error);
        setError("Error fetching CV data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCvData();
  }, [cvId, userInfo.token]);

  const downloadPdfDocument = () => {
    if (doc.current) {
      doc.current.save();
    }
  };

  const handleDeleteCV = async (cvId) => {
    try {
      const token = userInfo.token;
      const requestParams = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(`${base_url}api/cv/${cvId}`, requestParams);
      if (!response.ok) throw new Error("Failed to delete CV");
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Error deleting CV. Please try again.");
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <>
      <NavbarComponent />
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Container className="mt-4">
          <Row className="mb-3">
            <Col>
              <Button
                className="btn btn-primary me-2"
                onClick={downloadPdfDocument}
              >
                Download as PDF
              </Button>
              <Button
                variant="danger"
                className="me-2"
                onClick={() => handleDeleteCV(cvId)}
              >
                Delete
              </Button>
              <Button
                variant="info"
                className="me-2"
                onClick={() => navigate(`/editCV/${cvId}`)}
              >
                Edit
              </Button>
              <Dropdown className="me-2" style={{ marginTop: "3px" }}>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  Select Template
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleTemplateSelect("Template1")}
                  >
                    Template 1
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleTemplateSelect("Template2")}
                  >
                    Template 2
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          {cvData ? (
            <div>
              <h1 className="text-center">{cvData.cvName}</h1>
              <PDFExport
                paperSize="A4"
                margin="0.5cm"
                scale={0.5}
                fileName={cvData.cvName}
                ref={doc}
              >
                {selectedTemplate === "Template1" ? (
                  <CVPrintTemplate1
                    cvData={cvData}
                    cvPhotoUrl={cvPhotoUrl}
                    qrCodeUrl={qrCodeUrl}
                    cvRef={cvRef}
                  />
                ) : (
                  <CVPrintTemplate2
                    cvData={cvData}
                    cvPhotoUrl={cvPhotoUrl}
                    qrCodeUrl={qrCodeUrl}
                    cvRef={cvRef}
                  />
                )}
              </PDFExport>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}

          {cvData && (
            <Row className="mt-4">
              <Col className="d-flex flex-column align-items-center">
                <BusinessCardGenerator
                  cv={cvData}
                  cvPhotoUrl={cvPhotoUrl}
                  qrCodeUrl={qrCodeUrl}
                  cardStyle={{ width: "50%" }} // Set business card to half the width
                />
              </Col>
            </Row>
          )}
        </Container>
      )}
    </>
  );
};

export default CV;
