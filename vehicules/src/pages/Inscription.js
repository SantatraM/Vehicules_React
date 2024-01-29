import React, { useState } from 'react';
import '../assets/vendors/typicons.font/font/typicons.css';
import '../assets/vendors/css/vendor.bundle.base.css';
import '../assets/css/vertical-layout-light/style.css';
import '../assets/js/hoverable-collapse.js';
import '../assets/js/off-canvas.js';
import '../assets/js/settings.js';
import '../assets/js/todolist.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Inscription() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    sexe: "1",
    login: "",
    role: "admin",
    motDePasse: "",
    adresse: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    try {
      const response = await axios.post( "http://localhost:8080/initial/inscription", formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      } );
      console.log("tafiditra!!!");
      console.log(response.data.response.token);
      sessionStorage.setItem('token', response.data.response.token);
      navigate('/element');
    } catch (error) {
      console.log(error);
      setError(error.response.error);
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
                <img src="../assets/images/logo.svg" alt="logo"/>
              </div>
              <h4>Hello! let's get started</h4>
              <h6 className="font-weight-light">Sign in to continue.</h6>
              
                    <form className="pt-3" onSubmit={handleFormSubmit}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Nom"
                          name="nom"
                          value={formData.nom}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Prenom"
                          name="prenom"
                          value={formData.prenom}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="date"
                          className="form-control form-control-lg"
                          placeholder="Date de Naissance"
                          name="dateNaissance"
                          value={formData.dateNaissance}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <select
                          className="form-control form-control-lg"
                          name="sexe"
                          value={formData.sexe}
                          onChange={handleInputChange}
                        >
                          <option value="0">Femme</option>
                          <option value="1">Homme</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <input
                          type="mail"
                          className="form-control form-control-lg"
                          placeholder="mail"
                          name="login"
                          value={formData.login}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          placeholder="Mot de passe"
                          name="motDePasse"
                          value={formData.motDePasse}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="adresse"
                          className="form-control form-control-lg"
                          placeholder="Adresse"
                          name="adresse"
                          value={formData.adresse}
                          onChange={handleInputChange}
                        />
                      </div>
                      {error && <p style={{ color: 'red' }}>{error}</p>}
                      <div className="mt-3">
                        <button
                          type="submit"
                          className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                        >
                          S'INSCRIRE
                        </button>
                      </div>
                      <div className="mt-3">
                        <Link
                          to={"/login"}
                          className="btn btn-block btn-secondary btn-lg font-weight-medium auth-form-btn"
                        >
                          RETOUR
                        </Link>
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

export default Inscription;
