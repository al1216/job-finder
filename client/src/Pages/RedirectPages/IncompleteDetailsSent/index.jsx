import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Index() {
  let navigate = useNavigate();

  return (
    <div className="container-register">
      <div className="left-register">
        <div className="header-captions-register">
          <h1 className="header-register">
            Please fill all the valid details! (or) Some of your feilds are missing (or) Invalid Credentials !
          </h1>
          <p className="subheader-register">Your personal job finder is here</p>
        </div>

        <div className="login-register">
        <button
            className="submit-register"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </button>
          <button
            className="submit-register"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
          <button
            className="submit-register"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      </div>
      <div className="right-register">
        <img src="400-error.png" alt="" className="register-img" />

        <div className="title-wrapper-register">
          {/* <h1 className="title-register">Your Personal Job Finder</h1> */}
        </div>
      </div>
    </div>
  );
}
