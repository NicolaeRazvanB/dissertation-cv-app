// SidebarButtons.js
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Button, Nav } from "react-bootstrap";
import { Plus, Globe, Pencil } from "react-bootstrap-icons";
import logo from "../../public/logo.webp"; // Adjust the path to your logo

const SidebarButtons = () => {
  const navigate = useNavigate(); // Use the hook

  // Define navigation functions
  const handleAddCV = () => navigate("/addCV");
  const handleViewWebsites = () => navigate("/portfolios");
  const handleEditProfile = () => navigate("/editProfile");

  return (
    <div style={styles.sidebarContainer}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="MagickalResume Logo" style={styles.logo} />
      </div>
      <Nav className="flex-column" style={styles.nav}>
        <Button
          style={styles.button}
          onClick={handleAddCV}
          className="text-decoration-none text-white w-100 mb-2"
        >
          <Plus /> Add CV
        </Button>
        <Button
          style={styles.button}
          onClick={handleViewWebsites}
          className="text-decoration-none text-white w-100 mb-2"
        >
          <Globe /> Portfolios
        </Button>
        <Button
          style={styles.button}
          onClick={handleEditProfile}
          className="text-decoration-none text-white w-100"
        >
          <Pencil /> Edit Profile
        </Button>
      </Nav>
    </div>
  );
};

const styles = {
  sidebarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  logoContainer: {
    textAlign: "center",
  },
  logo: {
    width: "100px",
    height: "100px",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    width: "100%",
  },
  button: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    width: "100%",
    textAlign: "left",
    padding: "10px 20px",
  },
};

export default SidebarButtons;
