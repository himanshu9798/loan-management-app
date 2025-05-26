import React, { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faAt,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../component/signup16.css'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "United State",
    gender: "Male",
    role: "user",
    agree: false,
  });
  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword, agree } = formData;

    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!agree) {
      alert("Please agree to Terms & Conditions");
      return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if(users.some(u => u.username === username || u.email === email)) {
      alert("User with this username or email already exists!");
      return;
    }

    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));
    Swal.fire({
       text: "Registration successful! You can now login.",
    }).than(()=>{
        navigate("/")
    })
     
  };

  return (
    <Form className="mt-4" onSubmit={handleSubmit}>
      <Row>
        <Col xs={12} md={6}>
          <Form.Group className="position-relative mb-4">
            <label className="mb-2" htmlFor="username">
              USERNAME:
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <FontAwesomeIcon icon={faUser} className="ezy__signup16-icon" />
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group className="position-relative mb-4">
            <label className="mb-2" htmlFor="email">
              EMAIL:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <FontAwesomeIcon icon={faAt} className="ezy__signup16-icon" />
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group className="position-relative mb-4">
            <label className="mb-2" htmlFor="password">
              PASSWORD:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="******"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <FontAwesomeIcon icon={faLock} className="ezy__signup16-icon" />
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group className="position-relative mb-4">
            <label className="mb-2" htmlFor="confirmPassword">
              CONFIRM PASSWORD:
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="******"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <FontAwesomeIcon icon={faLock} className="ezy__signup16-icon" />
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group className="mb-4">
            <label htmlFor="country" className="mb-2">
              COUNTRY:
            </label>
            <InputGroup>
              <Form.Select
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="United State">United State</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Canada">Canada</option>
              </Form.Select>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group className="mb-4">
            <label htmlFor="gender" className="mb-2">
              GENDER:
            </label>
            <InputGroup>
              <Form.Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </InputGroup>
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group className="mb-4">
            <label htmlFor="role" className="mb-2">
              ROLE:
            </label>
            <InputGroup>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </InputGroup>
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group className="d-flex align-items-center h-100 mb-3 mt-2">
            <Form.Check>
              <input
                className="form-check-input"
                type="checkbox"
                value={formData.agree}
                id="agree"
                name="agree"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="agree">
                {" "}
                I agree all statements in{" "}
                <a href="#!">Terms & Conditions</a>
              </label>
            </Form.Check>
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <div className="d-flex justify-content-md-end mt-3">
            <Button
              variant=""
              type="submit"
              className="ezy__signup16-btn-submit"
            >
              Register <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default SignUpForm;
