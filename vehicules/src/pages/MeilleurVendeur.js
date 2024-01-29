import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/vendors/typicons.font/font/typicons.css';
import '../assets/vendors/css/vendor.bundle.base.css';
import '../assets/css/vertical-layout-light/style.css';
import '../assets/js/hoverable-collapse.js';
import '../assets/js/off-canvas.js';
import '../assets/js/settings.js';
import '../assets/js/todolist.js';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

function MeilleurVendeur() {
  const [months] = useState(Array.from({ length: 12 }, (_, index) => index + 1));
  const [mois, setMois] = useState('');
  const [annee, setAnnee] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'mois') setMois(value);
    else if (name === 'annee') setAnnee(value);
    else if (name === 'nombre') setNombre(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    navigate(`/statVendeur?mois=${mois}&annee=${annee}&nombre=${nombre}`);
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <Header />
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-6 grid-margin stretch-card mx-auto">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">recherche Statistiques meilleurs vendeur</h4>
                    <form className="forms-sample" onSubmit={handleFormSubmit}>
                      <div className="form-group">
                        <label>Mois</label>
                        <select className="form-control" name="mois" onChange={handleInputChange}>
                          {months.map((month) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Annee</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Veuillez entrer l'année (ex: 2022)"
                            pattern="\d{4}"
                            title="Veuillez entrer une année valide avec quatre chiffres."
                            name="annee"
                            onChange={handleInputChange}
                            required
                        />
                      </div>
                      <div className="form-group">
                      <label>limite</label>
                      <input type="text" className="form-control"  placeholder="Veuillez entrer la limite(ex:3)"  name="nombre" onChange={handleInputChange}/>
                      </div>
                     
                      {error && <p style={{ color: 'red' }}>{error}</p>}
                      {success && <p style={{ color: 'green' }}>{success}</p>}

                      <button type="submit" className="btn btn-primary mr-2">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeilleurVendeur;
