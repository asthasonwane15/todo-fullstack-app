import { useState } from "react";
import { login } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./loginPage.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login({
        email,
        password,
      });

      console.log(
        "Login Response:",
        data
      );

      localStorage.setItem(
        "token",
        data.token
      );

      alert("Login Success");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="logo">
          SmartTodo
        </h1>

        <p className="subtitle">
          Welcome Back
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          <button type="submit">
            Sign In
          </button>
        </form>

        <div className="signup-text">
          <span>
            Don't have an account?
          </span>

          <br />

          <Link to="/signup">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;