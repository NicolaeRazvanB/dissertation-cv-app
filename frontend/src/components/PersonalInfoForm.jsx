import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const PersonalInfoForm = ({ personalInfo, setPersonalInfo }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          className="w-25"
          type="text"
          name="firstName"
          value={personalInfo.firstName}
          onChange={handleChange}
          placeholder="Enter first name"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          className="w-25"
          type="text"
          name="lastName"
          value={personalInfo.lastName}
          onChange={handleChange}
          placeholder="Enter last name"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          className="w-25"
          type="email"
          name="email"
          value={personalInfo.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          className="w-25"
          type="text"
          name="phoneNumber"
          value={personalInfo.phoneNumber}
          onChange={handleChange}
          placeholder="Enter phone number"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control
          className="w-25"
          type="text"
          name="address"
          value={personalInfo.address}
          onChange={handleChange}
          placeholder="Enter address"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>LinkedIn</Form.Label>
        <Form.Control
          className="w-25"
          type="text"
          name="linkedIn"
          value={personalInfo.linkedIn}
          onChange={handleChange}
          placeholder="Enter LinkedIn profile URL"
        />
      </Form.Group>
    </Form>
  );
};

export default PersonalInfoForm;
