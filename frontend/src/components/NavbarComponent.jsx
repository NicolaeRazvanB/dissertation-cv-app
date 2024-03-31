import { AuthContext } from "../context/AuthContext";
import { Logout } from "../context/AuthActions";
import { useContext } from "react";
import { Button, Navbar, Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const { dispatch } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(Logout());
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Navbar bg="primary" variant="dark">
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
            <Navbar.Brand>MagickalResume</Navbar.Brand>
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
