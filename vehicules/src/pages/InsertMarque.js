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

function InsertMarque() {
    const token = sessionStorage.getItem("token");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const [nomMarque, setNomMarque] = useState("");
    const [idPays, setId_pays] = useState("");

    if( !token ) {
        navigate('/login');
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8080/marque", JSON.stringify({ nomMarque, idPays }), 
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response != null) {
                setSuccess(response);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.erreur) {
                setError(error.response.data.erreur);
            } else {
                setError("Une erreur inattendue s'est produite.");
            }
        }
    };

    const [pays, setPays] = useState([]);

    useEffect(() => {
    axios.get('http://localhost:8080/pays')
      .then(response => {
        if (Array.isArray(response.data.data)) {
          setPays(response.data.data);
          console.log(response.data.data);
        } else {
          console.error('La réponse de l\'API n\'est pas un tableau JSON:', response.data);
        }
      });
  }, []);

  return (
    <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
            <Header />
            <Sidebar />
            <div className="main-panel">         
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-md-6 grid-margin stretch-card mx-auto">
                            <div className="card ">
                                <div className="card-body">
                                    <h4 className="card-title">Insertion Marque</h4>
                                        <form className="forms-sample" onSubmit={handleFormSubmit}>
                                            <div className="form-group">
                                                <label >Marque</label>
                                                <input type="text" className="form-control" id="exampleInputUsername1" placeholder="nomMarque"
                                                    onChange={(e) => setNomMarque(e.target.value)}/>
                                            </div>
                                            <div className="form-group ">

                                                <label>Pays</label>
                                                    <select className="form-control" onChange={(e) => setId_pays(e.target.value)}>
                                                        {pays.map((country) => (
                                                            <option key={country.id}>{country.nomPays}</option>
                                                        ))}
                                                        
                                                    </select>
                                            </div>
                                                      {error && <p style={{ color: 'red' }}>{error}</p>}
                                                      {success && <p style={{ color: 'green' }}>{success}</p>}
                    
                                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
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

export default InsertMarque;
