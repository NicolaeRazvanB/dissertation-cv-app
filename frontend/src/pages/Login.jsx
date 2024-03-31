import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Form, Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

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

      // Use fetch to make the request
      const response = await fetch(base_url + "api/auth/login", requestParams);

      if (response.status === 200) {
        // Check if status is exactly 200
        const data = await response.json(); // Parse JSON only if response is successful
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
      } else {
        // Handle non-200 responses
        const errorData = await response.json(); // Optionally parse error data if available
        dispatch({ type: "LOGIN_FAILURE", payload: errorData });
        setError(true); // Assuming setError is defined in the outer scope
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
      setError(true); // Assuming setError is defined in the outer scope
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
    <Container style={{ maxWidth: "400px" }}>
      <h2 className="mt-5">Login</h2>
      <Form onSubmit={handleClick}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            ref={emailRef}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            ref={passwordRef}
          />
        </Form.Group>

        {error && <Alert variant="danger">Wrong credentials! Try again.</Alert>}
        <Button variant="primary" type="submit" disabled={isFetching}>
          Login
        </Button>
      </Form>
      <div className="mt-3">
        If you don't have an account, <Link to="/register">click here</Link>
      </div>
    </Container>
  );
};

export default Login;
