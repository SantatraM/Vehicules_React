import '../assets/vendors/typicons.font/font/typicons.css';
import '../assets/vendors/css/vendor.bundle.base.css';
import '../assets/css/vertical-layout-light/style.css';
import '../assets/js/hoverable-collapse.js';
import '../assets/js/off-canvas.js';
import '../assets/js/settings.js';
import '../assets/js/todolist.js';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import REact, {useEffect , useState} from 'react';
import axios from 'axios';

function InsertInteret() {
    const [taux, setTaux] = useState("");
    const [error , setError] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await axios.post( "http://localhost:8080/interet", JSON.stringify({ taux }));
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
