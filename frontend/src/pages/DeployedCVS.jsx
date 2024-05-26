import React, { useState, useEffect, useContext } from "react";
import {
  Spinner,
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import { AuthContext } from "../context/AuthContext";
import { requestOptions, base_url } from "../requestOptions";
import QRCode from "qrcode";
import SidebarButtons from "../components/SidebarButtons";

const DeployedCVS = () => {
  const [deployedCVS, setDeployedCVS] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editCV, setEditCV] = useState(null);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    fetchDeployedCVs();
  }, []);

  const fetchDeployedCVs = async () => {
    setLoading(true);
    try {
      const requestParams = {
        ...requestOptions,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await fetch(
        `${base_url}api/deployedCV/deployed-cvs`,
        requestParams
      );
      if (response.ok) {
        let data = await response.json();
        setDeployedCVS(data);
      } else {
        throw new Error("Failed to fetch Deployed CVs");
      }
    } catch (error) {
      console.error("Error fetching Deployed CVs:", error);
      setError("Error fetching Deployed CVs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cv) => {
    setLoading(true);
    try {
      const requestParams = {
        ...requestOptions,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        method: "DELETE",
      };

      // Delete QR code associated with the CV
      const deleteQRResponse = await fetch(`${base_url}api/qr/${cv.cvId}`, {
        ...requestParams,
        method: "DELETE",
      });

      if (!deleteQRResponse.ok) {
        throw new Error("Failed to delete QR code");
      }

      const response = await fetch(
        `${base_url}api/deployedCV/${cv._id}`,
        requestParams
      );
      if (!response.ok) {
        throw new Error("Failed to delete Deployed CV");
      }

      // Update the state to remove the deleted CV
      let cvId = cv._id;
      setDeployedCVS(deployedCVS.filter((cv) => cv._id !== cvId));
    } catch (error) {
      console.error("Error deleting Deployed CV:", error);
      setError("Error deleting Deployed CV. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cv) => {
    setEditCV(cv);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditCV(null);
  };

  const handleSave = async () => {
    if (!editCV) return;

    setLoading(true);
    try {
      const requestParams = {
        ...requestOptions,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        method: "PUT",
        body: JSON.stringify({
          siteName: editCV.siteName,
          themeName: editCV.themeName,
        }),
      };

      const response = await fetch(
        `${base_url}api/deployedCV/${editCV._id}`,
        requestParams
      );
      if (!response.ok) {
        throw new Error("Failed to update Deployed CV");
      }

      // Generate new QR code
      const qrUrl = `http://localhost:5173/portfolios/${editCV.siteName}`;
      const qrCodeDataUrl = await QRCode.toDataURL(qrUrl);

      // Create a Blob from the Data URL
      const qrCodeBlob = await (await fetch(qrCodeDataUrl)).blob();
      const qrCodeFile = new File(
        [qrCodeBlob],
        `${editCV.cvId}_${editCV.siteName}.png`,
        {
          type: "image/png",
        }
      );

      // Create FormData and append the file
      const formData = new FormData();
      formData.append("qrCode", qrCodeFile);
      formData.append("cvId", editCV.cvId);
      formData.append("siteName", editCV.siteName);

      // Upload QR code image to the server
      const uploadResponse = await fetch(`${base_url}api/uploadQR`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload QR code");
      }

      // Update the state with the edited CV
      setDeployedCVS(
        deployedCVS.map((cv) => (cv._id === editCV._id ? editCV : cv))
      );
      handleClose();
    } catch (error) {
      console.error("Error updating Deployed CV:", error);
      setError("Error updating Deployed CV. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEditCV({ ...editCV, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <NavbarComponent />
      <Container fluid>
        <div style={styles.background}>
          <Container className="mt-3">
            <h1 style={styles.heading}>Live Portfolios</h1>
            {loading && (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            {error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}
            {!loading && !error && deployedCVS.length === 0 && (
              <Alert variant="info" className="text-center">
                No Portfolios found.
              </Alert>
            )}
            {!loading && !error && deployedCVS.length > 0 && (
              <Row>
                {deployedCVS.map((cv) => (
                  <Col md={4} key={cv._id} className="mb-3">
                    <Card style={styles.card}>
                      <Card.Body>
                        <Card.Title>
                          <Link
                            to={`/portfolios/${cv.siteName}`}
                            target="_blank"
                            style={styles.cardLink}
                          >
                            {cv.siteName}
                          </Link>
                        </Card.Title>
                        <Card.Text style={styles.cardText}>
                          Theme: {cv.themeName}
                        </Card.Text>
                        <Card.Text style={styles.cardText}>
                          Deployed at:{" "}
                          {new Date(cv.createdAt).toLocaleDateString()}
                        </Card.Text>
                        <div className="d-flex justify-content-between">
                          <Button
                            variant="primary"
                            onClick={() => handleEdit(cv)}
                            className="me-2"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(cv)}
                          >
                            Delete
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}

            {editCV && (
              <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit launched portfolio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="formSiteName">
                      <Form.Label>Site Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="siteName"
                        value={editCV.siteName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formThemeName">
                      <Form.Label>Theme Name</Form.Label>
                      <Form.Select
                        name="themeName"
                        value={editCV.themeName}
                        onChange={handleChange}
                      >
                        <option value="Modern">Modern</option>
                        <option value="Classic">Classic</option>
                      </Form.Select>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleSave}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </Container>
        </div>
      </Container>
    </div>
  );
};

const styles = {
  background: {
    backgroundColor: "#e0e7ff", // Light blue background color
    minHeight: "100vh",
    padding: "20px",
  },
  heading: {
    color: "#333",
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "2rem",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  card: {
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    transition: "transform 0.2s ease-in-out",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    padding: "15px",
  },
  cardLink: {
    textDecoration: "none",
    color: "#4A90E2",
    fontWeight: "bold",
  },
  cardText: {
    color: "#333",
  },
};

export default DeployedCVS;
