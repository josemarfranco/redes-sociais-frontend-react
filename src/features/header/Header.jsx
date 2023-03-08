import React from "react";
import { useNavigate } from "react-router-dom";
import headerStyles from "./Header.module.css";

export default function Header(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("OI TERINHA!");
    navigate("/login");
  };

  console.log(props)

  return (
    <header>
      <div className={headerStyles["left-panel"]}>
        <img width="100" height="100" src={props.card.profilePic} alt={props.card.name} />
        <p>{props.card.name}</p>
      </div>
      <div className={headerStyles["right-panel"]}>
        <p onClick={handleLogout}>Sair</p>
      </div>
    </header>
  );
}
