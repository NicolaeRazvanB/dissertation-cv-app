import React, { useState, useEffect, useContext } from "react";
import { Spinner, Container, Form, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { requestOptions, base_url } from "../requestOptions";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
const EditProfile = () => {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});

  const fetchProfile = async () => {
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

      const response = await fetch(`${base_url}api/auth/user`, requestParams);

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          password: "",
          confirmPassword: "",
        });
      } else {
        throw new Error("Failed to fetch Profile info");
      }
    } catch (error) {
      console.error("Error fetching Profile data:", error);
      setErrors({ form: "Error fetching Profile. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile(); // Call the function directly
  }, [userInfo.token]);

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    // Add validation checks here, such as password length and matching confirmPassword
    if (formData.password !== formData.confirmPassword) {
      isValid = false;
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const { confirmPassword, ...userData } = formData;
      let requestParams = {
        ...requestOptions,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(userData),
      };
      const response = await fetch(`${base_url}api/auth/user`, requestParams);

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to update profile.");
      }

      // Navigate to home on success
      navigate("/");
    } catch (error) {
      console.error("Update error:", error);
      setErrors({
        form: error.message || "An error occurred during the update.",
      });
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        {" "}
        <NavbarComponent></NavbarComponent>{" "}
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      </>
    );
  }
  return (
    <>
      {" "}
      <NavbarComponent></NavbarComponent>{" "}
      <Container style={{ maxWidth: "600px" }}>
        <h2 className="mt-5">Edit Profile</h2>
        {errors.form && <Alert variant="danger">{errors.form}</Alert>}
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              isInvalid={!!errors.firstName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              isInvalid={!!errors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="New Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              // Do not mark as invalid because it's a new password
            />
            {/* Optionally provide feedback for the password field */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm New Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Update Profile
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default EditProfile;
