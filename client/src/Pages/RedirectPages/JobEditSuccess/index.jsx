import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Index() {
  let navigate = useNavigate();

  let onClickLogout = () => {
    localStorage.clear();
    navigate('/');
  }

  return (
    <div className="container-register">
      <div className="left-register">
        <div className="header-captions-register">
          <h1 className="header-register">
            Success! Job Posted/Edited Successfully :)
          </h1>
          <p className="subheader-register">Your personal job finder is here</p>
        </div>

        <div className="login-register">
          <button className="submit-register" onClick={() => {
            navigate('/');
          }}>
            Home
          </button>
          <button className="submit-register" onClick={() => onClickLogout()}>
            Logout
          </button>
        </div>
      </div>
      <div className="right-register">
        <img src="image-register-login.png" alt="" className="register-img" />

        <div className="title-wrapper-register">
          <h1 className="title-register">Your Personal Job Finder</h1>
        </div>
      </div>
    </div>
  );
}
