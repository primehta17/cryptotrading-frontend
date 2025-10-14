import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/AuthForm.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const REACT_APP_API_URL=process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${REACT_APP_API_URL}/api/auth/login`, { email, password });
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || " Login failed");
    }
  };

  return (
    <div className="auth-form">
      <h2 className="auth-form_title">Login</h2>
      <form onSubmit={submit} className="auth-form_form">
        <div className="auth-form_group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="auth-form_group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-form_button">Login</button>
        {error && <p className="auth-form_error">{error}</p>}
      </form>

      <div className="auth-form_footer">
        <p>Don't have an account?</p>
        <Link to="/register" className="auth-form_register-button">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;