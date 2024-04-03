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
    <Navbar bg="primary" variant="dark" sticky="top">
      <Container fluid>
        <Row className="w-100">
          <Col xs={4} className="d-flex justify-content-start">
            {location.pathname !== "/" && (
              <Button variant="outline-light" onClick={handleBack}>
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
              <Navbar.Brand>MagickalResume</Navbar.Brand>
            </Nav.Link>
          </Col>
          <Col xs={4} className="d-flex justify-content-end">
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
