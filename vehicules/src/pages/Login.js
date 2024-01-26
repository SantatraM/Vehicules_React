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

function Login() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  
  useEffect(() => {
    setError("");
  }, [email, pass]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // AuthentificationService.login(email, pass, history);
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
                  <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password"
                          onChange={(e) => setPass(e.target.value)}/>
                </div>
                <div className="mt-3">
                  <Link to='/element' className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</Link>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Don't have an account? <a href="register.html" className="text-primary">Create</a>
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
