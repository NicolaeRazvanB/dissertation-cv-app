import React, { useContext, useState, useEffect } from "react";
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
import NavbarComponent from "../components/NavbarComponent";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { requestOptions, base_url } from "../requestOptions";

const HomePage = () => {
  const { userInfo, dispatch } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate
  const [cvs, setCvs] = useState([]); // State to store CVs

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const token = userInfo.token; // Extract token from userInfo
        const requestParams = {
          ...requestOptions,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include bearer token in headers
          },
        };

        // Fetch user's CVs (GET request, so no body)
        const response = await fetch(base_url + "api/cv/my-cvs", requestParams);

        if (response.ok) {
          const data = await response.json();
          console.log("CVs Data:", data);
          setCvs(data); // Update CVs state with fetched data
        } else {
          throw new Error("Failed to fetch CVs");
        }
      } catch (error) {
        console.error("Error fetching CVs:", error);
      }
    };

    fetchCVs(); // Call fetchCVs function when component mounts
  }, [userInfo.cvs]); // Fetch CVs when userInfo changes

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
      <NavbarComponent></NavbarComponent>
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
            <div className="d-flex justify-content-center">
              <h2>My CVs</h2>
            </div>
            {/* Use justify-content-md-center to center the columns on medium devices and up */}
            <Row xs={1} md={2} lg={4} className="g-4 justify-content-center">
              {cvs.map((cv) => (
                <Col key={cv._id} className="d-flex justify-content-center">
                  <Card>
                    <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                      <Card.Title className="text-center mb-4">
                        {cv.cvName}
                      </Card.Title>
                      <div className="d-flex justify-content-center">
                        <Button variant="secondary" className="me-2">
                          View
                        </Button>
                        <Button variant="info" className="me-2">
                          Edit
                        </Button>
                        <Button variant="danger">Delete</Button>
                      </div>
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
