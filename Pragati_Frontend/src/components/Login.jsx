import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./Login.css";

const Login = ({ show, handleClose, handleLogin }) => {
  const [isSignup, setIsSignup] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    alert("Account created successfully!");
    setIsSignup(false);
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <div className="login-card light-theme">
        <button className="close-btn" onClick={handleClose}>
          ✕
        </button>

        <h2 className="login-title">{isSignup ? "Sign Up" : "Sign In"}</h2>
        <p className="login-subtitle">
          {isSignup ? "Create your account" : "Login with email"}
        </p>

        {!isSignup ? (
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="yourgmail@gmail.com"
                required
              />
            </Form.Group>

            {/* Password input */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                required
              />
            </Form.Group>

            {/* Role dropdown (newly added) */}
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select required>
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-between mb-3">
              <a href="#reset" className="reset-link">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="sign-btn w-100">
              Sign In
            </Button>

            <div className="social-btn google">
              <img
                src="https://img.icons8.com/color/20/000000/google-logo.png"
                alt="google"
              />
              Continue with Google
            </div>
            <div className="social-btn facebook">
              <img
                src="https://img.icons8.com/color/20/000000/facebook-new.png"
                alt="facebook"
              />
              Continue with Facebook
            </div>

            <p className="switch-text mt-3">
              Don’t have an account?{" "}
              <button
                type="button"
                className="switch-btn"
                onClick={() => setIsSignup(true)}
              >
                Sign Up
              </button>
            </p>
          </Form>
        ) : (
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                required
              />
            </Form.Group>

            <Button type="submit" className="sign-btn w-100">
              Sign Up
            </Button>

            <p className="switch-text mt-3">
              Already have an account?{" "}
              <button
                type="button"
                className="switch-btn"
                onClick={() => setIsSignup(false)}
              >
                Login
              </button>
            </p>
          </Form>
        )}
      </div>
    </Modal>
  );
};

export default Login;
