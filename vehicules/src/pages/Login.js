import '../assets/vendors/typicons.font/font/typicons.css';
import '../assets/vendors/css/vendor.bundle.base.css';
import '../assets/css/vertical-layout-light/style.css';
import '../assets/js/hoverable-collapse.js';
import '../assets/js/off-canvas.js';
import '../assets/js/settings.js';
import '../assets/js/todolist.js';
import logo from '../assets/images/logo.svg';

import { useState, useEffect } from "react";
import { Link,Redirect } from "react-router-dom";
import axios from "axios";

function Login() {
  const [redirectPath, setRedirectPath] = useState(null);
  const [error, setError] = useState("");
  const [login, setEmail] = useState("");
  const [motDePasse, setPass] = useState("");
  
  useEffect(() => {
    setError("");
  }, [login, motDePasse]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData =JSON.stringify({ login, motDePasse });
    // const formData = new URLSearchParams();
    // formData.append('login', e.target.login.value);
    // formData.append('motDePasse', e.target.motDePasse.value);
    console.log(formData);
      const response = await axios.post("http://localhost:8080/initial/login", formData,
      {
          headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response != null) {
        console.log("tafiditra!!!");
        localStorage.setItem('token', response.data.token);
        setRedirectPath('/element');
      } else {
        console.log("tsy tafiditra !!!");
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
              <form className="pt-3" onSubmit={handleFormSubmit} encType="application/x-www-form-urlencoded">
                <div className="form-group">
                  <input type="email" className="form-control form-control-lg" name="login" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control form-control-lg" name="motDePasse" placeholder="Password"
                          onChange={(e) => setPass(e.target.value)}/>
                </div>
                <div className="mt-3">
                  <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Don't have an account? <Link to="/inscription" className="text-primary">Create</Link>
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
