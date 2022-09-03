import React from "react";
import Header from "./Header";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ handleLogin}) => {
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
    if (!email || !password) {
      return;
    }
    handleLogin(email, password);
  };

  return (
    <>
      <Header>
        <li>
          <Link to={"/sign-up"} className="header__link">
            Регистрация
          </Link>
        </li>
      </Header>
      <div className="authentication">
        <form className="authentication__form" onSubmit={handleSubmit}>
          <h2 className="authentication__title">Вход</h2>
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
          <button className="authentication__button" aria-label="войти">
            Войти
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
