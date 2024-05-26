import React, { useState } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { requestOptions, base_url } from "../requestOptions";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/Logo.jpg";

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
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
      const { confirmPassword, ...userData } = formData;
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
        setTimeout(() => navigate("/login", { replace: true }), 3000);
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
    <div style={styles.background}>
      <Container style={styles.container}>
        <div style={styles.logoContainer}>
          <img src={logo} alt="MagickalResume Logo" style={styles.logo} />
        </div>
        <h2 className="mt-4" style={styles.title}>
          Register
        </h2>
        {errors.form && <Alert variant="danger">{errors.form}</Alert>}
        {success && (
          <Alert variant="success">
            Registration successful! Redirecting...
          </Alert>
        )}
        <Form noValidate onSubmit={handleSubmit} style={styles.form}>
          <Row>
            <Col md={6}>
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
                  style={styles.input}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
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
                  style={styles.input}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
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
              style={styles.input}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Row>
            <Col md={6}>
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
                  style={styles.input}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmPassword}
                  required
                  style={styles.input}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" style={styles.button}>
            Register
          </Button>
        </Form>
        <div className="mt-3" style={styles.registerLink}>
          Already have an account? <Link to="/login">Sign in here</Link>
        </div>
      </Container>
    </div>
  );
};

const styles = {
  background: {
    height: "100vh",
    backgroundColor: "#e0e7ff", // Light blue background color
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  container: {
    maxWidth: "500px",
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(230, 230, 250, 0.8))", // Gradient background
    padding: "30px",
    borderRadius: "15px", // More rounded corners for the glass effect
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(10px)", // Glass effect
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    animation: "shine 1.5s infinite linear",
  },
  logoContainer: {
    textAlign: "center",
    marginBottom: "20px",
  },
  logo: {
    width: "100px",
    height: "100px",
    borderRadius: "10px", // Slightly rounded corners for the logo
  },
  title: {
    textAlign: "center",
    color: "#333",
  },
  form: {
    marginTop: "20px",
  },
  input: {
    borderRadius: "5px",
    borderColor: "#ced4da",
  },
  button: {
    width: "100%",
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  registerLink: {
    textAlign: "center",
    marginTop: "20px",
  },
  "@keyframes shine": {
    "0%": {
      backgroundPosition: "-200% 0",
    },
    "100%": {
      backgroundPosition: "200% 0",
    },
  },
  shine: {
    background:
      "linear-gradient(90deg, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.2) 75%)",
    backgroundSize: "200% 100%",
    animation: "shine 1.5s infinite linear",
  },
};

export default Register;
