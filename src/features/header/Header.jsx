import React from "react";
import { useNavigate } from "react-router-dom";
import headerStyles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("OI TERINHA!");
    navigate("/login");
  };

  return (
    <header>
      <div className={headerStyles["header-left"]} />
      <div className={headerStyles["header-right"]}>
        <p onClick={handleLogout}>Sair</p>
      </div>
    </header>
  );
}
