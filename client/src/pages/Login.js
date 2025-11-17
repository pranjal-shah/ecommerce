import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../apis/auth.api";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    isError: false,
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (data) => {
    let email, password;
    email = password = null;
    data.errors.map((err) => {
      return err.path === "email" ? (email = err.msg) : (password = err.msg);
    });

    setError({
      isError: true,
      email: email || "",
      password: password || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(inputValue);
      console.log(data);
      const { success } = data;
      if (success) {
        dispatch({ type: "user/setUser", payload: data.user });
        navigate("/");
      } else {
        handleError(data);
      }
    } catch (error) {
      console.log(error);
      setInputValue({
        ...inputValue,
        email: "",
        password: "",
      });
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar></Navbar>
      {/* LOGIN */}
      <div className="login-container">
        <div className="login-form-container">
          <h2>Login Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="email-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={inputValue.email}
                placeholder="Enter your email"
                onChange={handleOnChange}
              />
              {error.isError ? (
                <h6 style={{ color: "red" }}>{error.email}</h6>
              ) : null}
            </div>
            <div className="password-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={inputValue.password}
                placeholder="Enter your password"
                onChange={handleOnChange}
              />
              {error.isError ? (
                <h6 style={{ color: "red" }}>{error.password}</h6>
              ) : null}
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
            <span className="span-field">
              Create New account? <Link to={"/register"}>Register</Link>
            </span>
          </form>
        </div>
      </div>
      {/* FOOTER */}
      <Footer></Footer>
    </>
  );
};

export default Login;
