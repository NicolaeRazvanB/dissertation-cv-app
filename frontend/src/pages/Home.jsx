import React from "react";
import { Button } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Logout } from "../context/AuthActions";
const HomePage = () => {
  const { user, dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.removeItem("userInfo"); // Remove user info from localStorage
    dispatch(Logout());
  };

  return (
    <div className="home-page">
      <h1>Welcome to the Home Page</h1>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default HomePage;
