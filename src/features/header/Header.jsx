import React from "react";
import { useNavigate } from "react-router-dom";
import headerStyles from "./Header.module.css";
import logo from "../../media/logo.jpg";

export default function Header(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("pixit");
    navigate("/login");
  };

  return (
    <header>
      <div className={headerStyles["left-panel"]}>
        <img
          width="100"
          height="100"
          src={props.card.profilePic}
          alt={props.card.name}
        />
        <div className={headerStyles["credentials"]}>
          <p>{props.card.name}</p>
          <p className={headerStyles["surname"]}>{props.card.surname}</p>
        </div>
      </div>
      <img src={logo} alt={logo} />
      <div className={headerStyles["right-panel"]}>
        <p onClick={handleLogout}>Sair</p>
      </div>
    </header>
  );
}
