import React from "react";
import "./style.css";
// import axios from 'axios';

export default function Index() {

  return (
    <div className="container-login">
      <div className="left-login">
        <div className="header-captions-login">
          <h1 className="header-login">Create an account</h1>
          <p className="subheader-login">Your personal job finder is here</p>
        </div>

        <form
          action={`${process.env.REACT_APP_HOST}/api/login`}
          className="form-login"
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
            <p className="checkbox-caption-login">
              By creating an account, I agree to our terms of use and privacy
              policy
            </p>
          </div>

          <button className="submit-login">
            Create Account
          </button>
        </form>

        {true &&
        <div className="feedback">
            <p>*Required field is empty or not valid!</p>
        </div>
        }

        <div className="login-login">
          <p className="login-caption">
            Already have an account?{" "}
            <a href="https://www.google.com/" className="login-url">
              Sign In
            </a>
          </p>
        </div>
      </div>
      <div className="right-login">
        <img src="image-register-login.png" alt="" className="login-img" />

        <div className="title-wrapper-login">
          <h1 className="title-login">Your Personal Job Finder</h1>
        </div>
      </div>
    </div>
  );
}
