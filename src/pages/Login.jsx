import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginCredentials, setLoginCredentials] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setLoginCredentials({
      ...loginCredentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/login", loginCredentials)
      .then((res) => {
        localStorage.setItem("OI TERINHA!", res.data.jwt);
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="standard-flex-container">
      <div className="standard-left-panel" />
      <div className="standard-right-panel">
        <form className="standard-form fade-in" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="standard-input"
            name="email"
            type="text"
            value={loginCredentials.email}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="password">Senha</label>
          <br />
          <input
            className="standard-input"
            name="password"
            type="password"
            value={loginCredentials.password}
            onChange={handleChange}
          />
          <br />
          <br />
          <a href="/register">
            <small>Criar conta</small>
          </a>
          <br />
          <a
            href="https://giphy.com/gifs/se-fudeu-fodeu-Y4c8GgvNh7BiBbv8fp"
            rel="noopener noreferrer"
            target="_blank"
          >
            <small>Esqueci minha senha</small>
          </a>
          <br />
          <button className="standard-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
