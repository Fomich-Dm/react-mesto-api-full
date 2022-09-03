import React from "react";
import logo from "../images/logo.svg";

function Headers({ children }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место" />
      <nav>
        <ul className="header__list">{children}</ul>
      </nav>
    </header>
  );
}

export default Headers;
