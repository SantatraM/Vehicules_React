import '../assets/vendors/typicons.font/font/typicons.css';
import '../assets/vendors/css/vendor.bundle.base.css';
import '../assets/css/vertical-layout-light/style.css';
import '../assets/js/hoverable-collapse.js';
import '../assets/js/off-canvas.js';
import '../assets/js/settings.js';
import '../assets/js/todolist.js';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function InsertInteret() {
    const token = sessionStorage.getItem("token");
    const [taux, setTaux] = useState("");
    const [error , setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    if (!token) {
        navigate('/login');
    }
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post( "http://localhost:8080/interet", JSON.stringify({ taux }), { headers });
            if (response.data.data != null) {
                setSuccess("Interet inséré avec succès !");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.erreur) {
                setError(error.response.data.erreur);
            } else {
                setError("Une erreur inattendue s'est produite.");
            }
        }
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
                                <div className="card ">
                                    <div className="card-body">
                                        <h4 className="card-title">Insertion Interet</h4>
                                        <form className="forms-sample" onSubmit={handleFormSubmit} >
                                            <div className="form-group">
                                                <label for="exampleInputUsername1">taux</label>
                                                <input type="number" className="form-control" name='interet' placeholder="interet" onChange={(e) => setTaux(e.target.value)}/>
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

export default InsertInteret;
