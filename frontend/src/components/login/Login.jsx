import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/storeContext";
import axios from 'axios';

const Login = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({ ...data, [name]: value });
  };

  const onLogin = async(e) => {
    e.preventDefault();

    let newUrl = url;
    if(currentState === 'Login'){
      newUrl += "/api/user/login"
    }else{
      newUrl += "/api/user/register"
    };

    const res = await axios.post(newUrl, data);
    if(res.data.success){
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setShowLogin(false);
    }else{
      alert(res.data.message);
    }
  };

  return (
    <div className="login">
      <form onSubmit={onLogin} className="login-container">
        <div className="login-title">
          <h2>{currentState}</h2>

          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
        </div>

        <div className="login-inputs">
          {currentState == "Login" ? ("") : (
            <input
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              name="name"
              placeholder="Your Name"
              required
            />
          )}

          <input
            onChange={onChangeHandler}
            value={data.email}
            name="email"
            type="email"
            placeholder=" Your Email"
            required
          />

          <input
            onChange={onChangeHandler}
            value={data.password}
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit">{currentState === "Sign Up" ? "Create Account" : "Login"}</button>

        <div className="login-condition">
          <input type="checkbox" required />
          <p>By Continuing, I agree to the terms of use and privacy policy.</p>
        </div>

        {currentState === "Login" ? (<p>Create a new account?{" "} <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>) 
          : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
