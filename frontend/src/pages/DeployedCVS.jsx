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
} from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import { AuthContext } from "../context/AuthContext";
import { requestOptions, base_url } from "../requestOptions";

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

  const handleDelete = async (cvId) => {
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

      const response = await fetch(
        `${base_url}api/deployedCV/${cvId}`,
        requestParams
      );
      if (!response.ok) {
        throw new Error("Failed to delete Deployed CV");
      }

      // Update the state to remove the deleted CV
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
      <Container className="mt-3">
        <h1>Deployed CVs</h1>
        {loading && (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {!loading && !error && (
          <Row>
            {deployedCVS.map((cv) => (
              <Col md={4} key={cv._id} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/portfolios/${cv.siteName}`}>
                        {cv.siteName}
                      </Link>
                    </Card.Title>
                    <Card.Text>Theme: {cv.themeName}</Card.Text>
                    <Card.Text>CV ID: {cv.cvId}</Card.Text>
                    <Card.Text>
                      Deployed at: {new Date(cv.createdAt).toLocaleDateString()}
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleEdit(cv)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(cv._id)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {editCV && (
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Deployed CV</Modal.Title>
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
  );
};

export default DeployedCVS;
