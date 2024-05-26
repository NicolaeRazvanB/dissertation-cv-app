import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Form, Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.jpg";

import { requestOptions, base_url } from "../requestOptions";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const [error, setError] = useState(false);

  const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
      let requestParams = {
        ...requestOptions,
        method: "POST",
        body: JSON.stringify(userCredential),
      };

      const response = await fetch(base_url + "api/auth/login", requestParams);

      if (response.status === 200) {
        const data = await response.json();
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
      } else {
        const errorData = await response.json();
        dispatch({ type: "LOGIN_FAILURE", payload: errorData });
        setError(true);
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
      setError(true);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: emailRef.current.value, password: passwordRef.current.value },
      dispatch
    );
  };

  return (
    <div style={styles.background}>
      <Container style={styles.container}>
        <div style={styles.logoContainer}>
          <img src={logo} alt="MagickalResume Logo" style={styles.logo} />
        </div>
        <h2 className="mt-4" style={styles.title}>
          Login
        </h2>
        <Form onSubmit={handleClick} style={styles.form}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              ref={emailRef}
              style={styles.input}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              ref={passwordRef}
              style={styles.input}
            />
          </Form.Group>

          {error && (
            <Alert variant="danger">Wrong credentials! Try again.</Alert>
          )}
          <Button
            variant="primary"
            type="submit"
            disabled={isFetching}
            style={styles.button}
          >
            Login
          </Button>
        </Form>
        <div className="mt-3" style={styles.registerLink}>
          If you don't have an account, <Link to="/register">click here</Link>
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
    maxWidth: "400px",
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

export default Login;
