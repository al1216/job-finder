import React from "react";
import "./style.css";
import axios from 'axios';
import {useNavigate} from "react-router-dom"

function Index() {
  let navigate = useNavigate();

  let submitLoginForm = async (e) => {
    // e.preventDefault();
    await axios.get(`${process.env.REACT_APP_HOST}/check/abc`).then((res) => {
      const status = res.data.status;
      if (status === 200) {
        localStorage.clear();
        let token = res.data.message;
        let email = res.data.email;
        let name = res.data.name;
        localStorage.setItem('user-token',token);
        localStorage.setItem('email',email);
        localStorage.setItem('name',name);
        
        setTimeout(() => {
          navigate('/');
        },2000);
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <div className="container-login">
      <div className="left-login">
        <div className="header-captions-login">
          <h1 className="header-login">Already have an account?</h1>
          <p className="subheader-login">Your personal job finder is here</p>
        </div>

        <form
          action={`${process.env.REACT_APP_HOST}/api/login`}
          className="form-login"
          method="post"
          onSubmit={submitLoginForm}
        >
    
          <input
            type="email"
            name="email"
            className="email"
            placeholder="Email"
          />
          
          <input
            type="password"
            name="password"
            className="password"
            placeholder="Password"
          />
        
          <button className="submit-login">
            Sign In
          </button>
        </form>

        <div className="login-login">
          <p className="login-caption">
          Don’t have an account?{" "}
            <span onClick={() => {
              navigate('/register');
            }} className="register-url">
              Sign Up
            </span>
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
export default Index;
