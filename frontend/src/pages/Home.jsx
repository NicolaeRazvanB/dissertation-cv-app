import React, { useContext } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Card,
} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { Logout } from "../context/AuthActions";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const HomePage = () => {
  const { userInfo, dispatch } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    localStorage.removeItem("userInfo"); // Remove user info from localStorage
    dispatch(Logout());
  };

  // Dummy data for CVs, replace with your actual data source
  const cvs = [
    { id: 1, title: "CV 1" },
    { id: 2, title: "CV 2" },
    // Add more CVs here
  ];

  const handleAddCV = () => {
    navigate("/addCV"); // Navigate to addCV route
  };

  const handleViewWebsites = () => {
    navigate("/portfolios"); // Navigate to portfolios route
  };

  const handleEditProfile = () => {
    navigate("/editProfile"); // Navigate to editProfile route
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" className="justify-content-between">
        <Navbar.Brand className="mx-auto">MagickalResume</Navbar.Brand>
        <Button variant="outline-light" onClick={handleLogout}>
          Logout
        </Button>
      </Navbar>
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
                }}
              >
                Add CV
              </Button>
              <Button
                variant="light"
                onClick={handleViewWebsites}
                className="text-decoration-none text-dark w-100 mb-2"
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #dee2e6",
                }}
              >
                View My Websites
              </Button>
              <Button
                variant="light"
                onClick={handleEditProfile}
                className="text-decoration-none text-dark w-100"
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #dee2e6",
                }}
              >
                Edit Profile
              </Button>
            </Nav>
          </Col>
          <Col>
            <h2>My CVs</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              {cvs.map((cv) => (
                <Col key={cv.id}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{cv.title}</Card.Title>
                      <Button variant="secondary" className="me-2">
                        View
                      </Button>
                      <Button variant="info" className="me-2">
                        Edit
                      </Button>
                      <Button variant="danger">Delete</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
