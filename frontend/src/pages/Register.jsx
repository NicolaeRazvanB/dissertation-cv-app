import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { requestOptions, base_url } from "../requestOptions";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let formIsValid = true;
    let newErrors = {};

    // Name validation
    if (
      !formData.firstName ||
      formData.firstName.length < 2 ||
      formData.firstName.length > 20
    ) {
      formIsValid = false;
      newErrors.firstName = "First name must be between 2 and 20 characters.";
    }

    if (
      !formData.lastName ||
      formData.lastName.length < 2 ||
      formData.lastName.length > 20
    ) {
      formIsValid = false;
      newErrors.lastName = "Last name must be between 2 and 20 characters.";
    }

    // Email validation
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      !emailRegex.test(formData.email) ||
      formData.email.length > 50 ||
      formData.email.length < 5
    ) {
      formIsValid = false;
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (!formData.password || formData.password.length < 8) {
      formIsValid = false;
      newErrors.password = "Password must be at least 8 characters long.";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      formIsValid = false;
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Validation failed");
      return;
    }

    try {
      const { confirmPassword, ...userData } = formData; // Exclude confirmPassword from the submission data
      let requestParams = {
        ...requestOptions,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      };
      const response = await fetch(
        base_url + "api/auth/register",
        requestParams
      );

      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => navigate("/login", { replace: true }), 3000); // Navigate after showing success message
      } else {
        const errData = await response.json();
        setErrors({
          form: errData.message || "An error occurred during registration.",
        });
      }
    } catch (err) {
      setErrors({ form: "An error occurred during registration." });
    }
  };

  return (
    <Container style={{ maxWidth: "600px" }}>
      <h2 className="mt-5">Register</h2>
      {errors.form && <Alert variant="danger">{errors.form}</Alert>}
      {success && (
        <Alert variant="success">Registration successful! Redirecting...</Alert>
      )}
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
            required
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
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            isInvalid={!!errors.confirmPassword}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <div className="mt-3">
        Already have an account? <Link to="/login">Sign in here</Link>
      </div>
    </Container>
  );
};

export default Register;
