import { useContext } from "react";
import { Button, Navbar, Container, Row, Col, Nav } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Logout } from "../context/AuthActions";

const NavbarComponent = () => {
  const { dispatch } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(Logout());
    navigate("/login");
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleHomeClick = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <Navbar style={styles.navbar} sticky="top">
      <Container fluid>
        <Row className="w-100">
          <Col xs={4} className="d-flex justify-content-start">
            {location.pathname !== "/" && (
              <Button
                variant="outline-light"
                onClick={handleBack}
                style={styles.button}
              >
                Back
              </Button>
            )}
          </Col>
          <Col xs={4} className="d-flex justify-content-center">
            {/* Wrap the Navbar.Brand in a div or Nav.Link to make it clickable */}
            <Nav.Link
              onClick={handleHomeClick}
              style={{ color: "white", cursor: "pointer" }}
            >
              <Navbar.Brand style={styles.brand}>MagickalResume</Navbar.Brand>
            </Nav.Link>
          </Col>
          <Col xs={4} className="d-flex justify-content-end">
            <Button
              variant="outline-light"
              onClick={handleLogout}
              style={styles.button}
            >
              Logout
            </Button>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#4A90E2", // Primary color
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
  },
  button: {
    borderColor: "white",
    color: "white",
    marginLeft: "10px",
    marginRight: "10px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
  },
  brand: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "white",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)", // Subtle text shadow
  },
};

export default NavbarComponent;
