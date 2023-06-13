import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Index() {
  let navigate = useNavigate();

  return (
    <div className="container-register">
      <div className="left-register">
        <div className="header-captions-register">
          <h1 className="header-register">Create an account</h1>
          <p className="subheader-register">Your personal job finder is here</p>
        </div>

        <form
          action={`${process.env.REACT_APP_HOST}/api/register`}
          className="form-register"
          method="post"
        >
          <input
            type="text"
            name="name"
            className="name"
            placeholder="Name"
            autoFocus
          />
          <input
            type="email"
            name="email"
            className="email"
            placeholder="Email"
          />
          <input
            type="number"
            name="number"
            className="number"
            placeholder="Mobile"
          />
          <input
            type="password"
            name="password"
            className="password"
            placeholder="Password"
          />
          <div className="wrapper-checkbox">
            <input type="checkbox" name="checkbox" className="checkbox" />
            <p className="checkbox-caption-register">
              By creating an account, I agree to our terms of use and privacy
              policy
            </p>
          </div>

          <button className="submit-register" type="submit">
            Create Account
          </button>
        </form>

        {/* {true &&
        <div className="feedback">
            <p>*Required field is empty or not valid!</p>
        </div>
        } */}

        <div className="login-register">
          <p className="login-caption">
            Already have an account?{" "}
            <span onClick={() => {
              navigate('/login');
            }} className="login-url">
              Sign In
            </span>
          </p>
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
