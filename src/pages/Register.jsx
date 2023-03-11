import React from "react";
import axios from "axios";
import registerStyles from "../features/register/Register.module.css";
import commonStyles from "../features/common/Common.module.css";
import { Link, useNavigate } from "react-router-dom";
import LeftPanel from "../features/leftPanel/LeftPanel";

export default function Register() {
  const [newUser, setNewUser] = React.useState({
    profilePic: "",
    email: "",
    name: "",
    surname: "",
    dob: "",
    password: "",
    passwordConf: "",
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

  return (
    <div className={registerStyles["container"]}>
      <LeftPanel />
      <div className={registerStyles["right-panel"]}>
        <form className={registerStyles["form"]} onSubmit={handleSubmit}>
          <label htmlFor="profilePic">Foto</label>
          <input name="profilePic" type="file" onChange={handleFileChange} />
          <label htmlFor="email">Email</label>
          <input
            className={commonStyles["standard-input"]}
            name="email"
            type="text"
            value={newUser.email}
            onChange={handleChange}
          />
          <label htmlFor="name">Nome</label>
          <input
            className={commonStyles["standard-input"]}
            name="name"
            type="text"
            value={newUser.name}
            onChange={handleChange}
          />
          <label htmlFor="surname">Sobrenome</label>
          <input
            className={commonStyles["standard-input"]}
            name="surname"
            type="text"
            value={newUser.surname}
            onChange={handleChange}
          />
          <label htmlFor="dob">Data de nascimento</label>
          <input
            className={commonStyles["standard-input"]}
            name="dob"
            type="date"
            min="1950-01-01"
            max="2012-01-01"
            value={newUser.dob}
            onChange={handleChange}
          />
          <label htmlFor="password">Senha</label>
          <input
            className={commonStyles["standard-input"]}
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleChange}
          />
          <label htmlFor="password">Confirmação da senha</label>
          <input
            className={commonStyles["standard-input"]}
            name="passwordConf"
            type="password"
            value={newUser.passwordConf}
            onChange={handleChange}
          />
          <button className={commonStyles["standard-button"]} type="submit">
            Criar conta
          </button>
          <Link to="/login">
            <small>Voltar</small>
          </Link>
        </form>
      </div>
    </div>
  );
}
