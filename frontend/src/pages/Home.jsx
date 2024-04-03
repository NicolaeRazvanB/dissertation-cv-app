import React, { useContext, useState, useEffect } from "react";
import {
  Spinner,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Nav,
  Card,
} from "react-bootstrap";
import { Plus, Globe, Pencil } from "react-bootstrap-icons";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import { requestOptions, base_url } from "../requestOptions";

const HomePage = () => {
  const { userInfo, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cvs, setCvs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchCVs = async () => {
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

      const response = await fetch(`${base_url}api/cv/my-cvs`, requestParams);

      if (response.ok) {
        const data = await response.json();
        setCvs(data);
      } else {
        throw new Error("Failed to fetch CVs");
      }
    } catch (error) {
      console.error("Error fetching CVs:", error);
      setError("Error fetching CVs. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCVs();
  }, [userInfo.cvs]);

  const handleAddCV = () => {
    navigate("/addCV");
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

      if (!response.ok) {
        throw new Error("Failed to delete CV");
      }

      await fetchCVs();
    } catch (error) {
      console.error(error);
      setError("Error deleting CV. Please try again.");
    }
  };

  const handleViewWebsites = () => {
    navigate("/portfolios"); // Navigate to portfolios route
  };

  const handleEditProfile = () => {
    navigate("/editProfile"); // Navigate to editProfile route
  };
  return (
    <>
      <NavbarComponent></NavbarComponent>{" "}
      <div className="container mt-4">
        {error && <Alert variant="danger">{error}</Alert>}
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <Container fluid>
            <Row>
              <Col xs={2} className="bg-light p-3 sidebar">
                <Nav className="flex-column">
                  <Button
                    variant="light"
                    onClick={handleAddCV}
                    className="text-decoration-none text-dark w-100 mb-2"
                    style={{
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #dee2e6",
                      whiteSpace: "normal",
                    }}
                  >
                    <Plus /> Add CV
                  </Button>
                  <Button
                    variant="light"
                    onClick={handleViewWebsites}
                    className="text-decoration-none text-dark w-100 mb-2"
                    style={{
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #dee2e6",
                      whiteSpace: "normal",
                    }}
                  >
                    <Globe /> Portfolios
                  </Button>
                  <Button
                    variant="light"
                    onClick={handleEditProfile}
                    className="text-decoration-none text-dark w-100"
                    style={{
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #dee2e6",
                      whiteSpace: "normal",
                    }}
                  >
                    <Pencil /> Edit Profile
                  </Button>
                </Nav>
              </Col>
              <Col>
                <div className="d-flex justify-content-center">
                  <h2>My CVs</h2>
                </div>

                <Row
                  xs={1}
                  md={2}
                  lg={4}
                  className="g-4 justify-content-center"
                >
                  {cvs.map((cv) => (
                    <Col key={cv._id} className="d-flex justify-content-center">
                      <Card>
                        <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                          <Card.Title className="text-center mb-4">
                            {cv.cvName}
                          </Card.Title>
                          <div className="d-flex justify-content-center">
                            <Button
                              variant="secondary"
                              className="me-2"
                              onClick={() => navigate(`/cv/${cv._id}`)}
                            >
                              View
                            </Button>
                            <Button
                              variant="info"
                              className="me-2"
                              onClick={() => navigate(`/editCV/${cv._id}`)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => handleDeleteCV(cv._id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </>
  );
};

export default HomePage;
