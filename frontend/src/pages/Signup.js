import { useState } from "react";
import { signup } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const data = await signup({
      name,
      email,
      password,
    });

    console.log(data);

    alert("Signup Successful");

    navigate("/");
  };

  return (
    <div>
      <h1>Signup</h1>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <br />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">
          Signup
        </button>
      </form>

      <br />

      <Link to="/">
        Login
      </Link>
    </div>
  );
}

export default Signup;