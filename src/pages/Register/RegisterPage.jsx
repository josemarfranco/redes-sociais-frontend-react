import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [newUser, setNewUser] = React.useState({
    profilePic: "",
    email: "",
    name: "",
    surname: "",
    dob: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.files[0] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/users/create", newUser, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        alert(res.data.message);
        navigate("/login");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  console.log(newUser);

  return (
    <>
      <div className="standard-flex-container">
        <div className="standard-left-panel" />
        <div className="standard-right-panel">
          <form className="standard-form fade-in" onSubmit={handleSubmit}>
            <h2>Cadastro</h2>
            <br />
            <label htmlFor="profilePic">Foto</label>
            <br />
            <input name="profilePic" type="file" onChange={handleFileChange} />
            <br />
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input
              className="standard-input"
              name="email"
              type="text"
              value={newUser.email}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="name">Nome</label>
            <br />
            <input
              className="standard-input"
              name="name"
              type="text"
              value={newUser.name}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="surname">Sobrenome</label>
            <br />
            <input
              className="standard-input"
              name="surname"
              type="text"
              value={newUser.surname}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="dob">Data de nascimento</label>
            <br />
            <input
              className="standard-input"
              name="dob"
              type="date"
              min="1950-01-01"
              max="2012-01-01"
              value={newUser.dob}
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
              value={newUser.password}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="password">Confirmação da senha</label>
            <br />
            <input
              className="standard-input"
              name="password"
              type="password"
              value={newUser.password}
              onChange={handleChange}
            />
            <br />
            <br />
            <button className="standard-button" type="submit">
              Criar conta
            </button>
            <br />
            <a href="/">
              <small>Voltar</small>
            </a>
          </form>
        </div>
      </div>
    </>
  );
}
