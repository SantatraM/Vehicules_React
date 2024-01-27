import '../assets/vendors/typicons.font/font/typicons.css';
import '../assets/vendors/css/vendor.bundle.base.css';
import '../assets/css/vertical-layout-light/style.css';
import '../assets/js/hoverable-collapse.js';
import '../assets/js/off-canvas.js';
import '../assets/js/settings.js';
import '../assets/js/todolist.js';
import logo from '../assets/images/logo.svg';

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [error, setError] = useState("");
  const [login, setEmail] = useState("");
  const [motDePasse, setPass] = useState("");
  
  useEffect(() => {
    setError("");
  }, [login, motDePasse]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/initial/login",
        JSON.stringify({ login, motDePasse }),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials: true,
        }
      );
    } catch (error) {
      if (!error?.response) {
        setError("No server Response");
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <div className="container-scroller">
    <div className="container-fluid page-body-wrapper full-page-wrapper">
      <div className="content-wrapper d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src={logo} alt="logo"/>
              </div>
              <h4>Hello! let's get started</h4>
              <h6 className="font-weight-light">Sign in to continue.</h6>
              <form className="pt-3" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password"
                          onChange={(e) => setPass(e.target.value)}/>
                </div>
                <div className="mt-3">
                  <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Don't have an account? <Link to="/" className="text-primary">Create</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
}

export default Login;
