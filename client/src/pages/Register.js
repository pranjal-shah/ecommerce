import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { register } from "../apis/auth.api";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    user_name: "",
  });
  const [error, setError] = useState({
    isError: false,
    email: "",
    password: "",
    user_name: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (data) => {
    let email, password, user_name;
    email = password = user_name = null;
    data.errors.map((err) => {
      return err.path === "email"
        ? (email = err.msg)
        : err.path === "password"
        ? (password = err.msg)
        : (user_name = err.msg);
    });
    setError({
      isError: true,
      email: email || "",
      password: password || "",
      user_name: user_name || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(inputValue);
      const { success } = data;
      if (success) {
        dispatch({ type: "user/setUser", payload: data.user });
        setTimeout(() => {
          navigate("/");
        }, 1000);
        setInputValue({
          ...inputValue,
          email: "",
          password: "",
          user_name: "",
        });
      } else {
        handleError(data);
      }
    } catch (error) {
      console.log(error);
      setInputValue({
        ...inputValue,
        email: "",
        password: "",
        user_name: "",
      });
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar></Navbar>
      {/* REGISTER */}
      <div className="register-container">
        <div className="register-form-container">
          <h2>Register Account</h2>
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
            <div className="username-field">
              <label htmlFor="user_name">username</label>
              <input
                type="text"
                name="user_name"
                value={inputValue.user_name}
                placeholder="Enter your username"
                onChange={handleOnChange}
              />
              {error.isError ? (
                <h6 style={{ color: "red" }}>{error.user_name}</h6>
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
              Already have an account? <Link to={"/login"}>Login</Link>
            </span>
          </form>
        </div>
      </div>
      {/* FOOTER */}
      <Footer></Footer>
    </>
  );
};

export default Register;
