import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const Register = ({ handleRegister}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;
    handleRegister(email, password);
  };

  return (
    <>
      <Header>
        <li>
          <Link to={"/sign-in"} className="header__link">
            Войти
          </Link>
        </li>
      </Header>
      <div className="authentication">
        <form className="authentication__form" onSubmit={handleSubmit}>
          <h2 className="authentication__title">Регистрация</h2>
          <input
            className="authentication__input"
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
          ></input>
          <input
            className="authentication__input"
            id="password"
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
          ></input>
          <button
            className="authentication__button"
            aria-label="войти"
            type="submit"
          >
            Зарегистрироваться
          </button>
          <Link to="/sign-in" className="authentication__link">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </div>
    </>
  );
};

export default Register;
