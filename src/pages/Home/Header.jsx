import React from "react";

export default function Header() {
  const handleLogout = () => {
    localStorage.removeItem("OI TERINHA!");
  };

  return (
    <>
      <header className="fade-in">
        <div className="header-left" />
        <div className="header-right">
          <a href="/login" onClick={handleLogout}>
            Sair
          </a>
          <a
            href="https://giphy.com/gifs/masterchefbr-help-masterchef-vxdhxk40EKRHpRbeSp"
            rel="noopener noreferrer"
            target="_blank"
          >
            Ajuda
          </a>
        </div>
      </header>
    </>
  );
}
