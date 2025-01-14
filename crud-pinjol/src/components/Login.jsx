import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("https://project-uas-eight.vercel.app/api/api/login", {
        email,
        password,
      })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        navigate("/home");
      })
      .catch(() => {
        setError("Login failed. Please check your credentials.");
      });
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "white" }} // Mengatur warna latar belakang menjadi putih
    >
      <div
        className="card shadow-lg p-4"
        style={{ backgroundColor: "blue", maxWidth: "400px", width: "100%" }}
      >
        <div className="card-body text-white">
    
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            {error && (
              <div className="alert alert-danger text-center">{error}</div>
            )}
            <button type="submit" className="btn btn-success w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
