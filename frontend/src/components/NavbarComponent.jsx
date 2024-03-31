import { AuthContext } from "../context/AuthContext";
import { Logout } from "../context/AuthActions";
import { useContext } from "react";
import { Button, Navbar } from "react-bootstrap";
const NavbarComponent = () => {
  const { userInfo, dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.removeItem("userInfo"); // Remove user info from localStorage
    dispatch(Logout());
  };
  return (
    <Navbar bg="primary" variant="dark" className="justify-content-between">
      <Navbar.Brand className="mx-auto">MagickalResume</Navbar.Brand>
      <Button variant="outline-light" onClick={handleLogout}>
        Logout
      </Button>
    </Navbar>
  );
};

export default NavbarComponent;
