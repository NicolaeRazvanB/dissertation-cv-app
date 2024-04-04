// SidebarButtons.js
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Button, Nav } from "react-bootstrap";
import { Plus, Globe, Pencil } from "react-bootstrap-icons";

const SidebarButtons = () => {
  const navigate = useNavigate(); // Use the hook

  // Define navigation functions
  const handleAddCV = () => navigate("/addCV");
  const handleViewWebsites = () => navigate("/portfolios");
  const handleEditProfile = () => navigate("/editProfile");

  return (
    <Nav className="flex-column">
      <Button
        variant="light"
        onClick={handleAddCV}
        className="text-decoration-none text-dark w-100 mb-2"
      >
        <Plus /> Add CV
      </Button>
      <Button
        variant="light"
        onClick={handleViewWebsites}
        className="text-decoration-none text-dark w-100 mb-2"
      >
        <Globe /> Portfolios
      </Button>
      <Button
        variant="light"
        onClick={handleEditProfile}
        className="text-decoration-none text-dark w-100"
      >
        <Pencil /> Edit Profile
      </Button>
    </Nav>
  );
};

export default SidebarButtons;
