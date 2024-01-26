import '../assets/vendors/typicons.font/font/typicons.css';
import '../assets/vendors/css/vendor.bundle.base.css';
import '../assets/css/vertical-layout-light/style.css';
import '../assets/js/hoverable-collapse.js';
import '../assets/js/off-canvas.js';
import '../assets/js/settings.js';
import '../assets/js/todolist.js';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import REact, {useEffect , useState} from 'react';
import axios from 'axios';

function InsertFonctionnalite() {
    const [nomfonctionnalite, setFonctionnalite] = useState("");
    const [error , setError] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                "http://localhost:8080/fonctionnalite",
                JSON.stringify({ nomfonctionnalite }),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        } catch (error) {
            if (error.response) {
                console.error("Error response from server:", error.response.data);
                setError("Registration failed");
            } else {
                console.error("No server response:", error.message);
                setError("No server response");
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
                                        <h4 className="card-title">Insertion Fonctionnalite</h4>
                                            <form className="forms-sample" onSubmit={handleFormSubmit}>
                                                <div className="form-group">
                                                    <label for="exampleInputUsername1">Fonctionnalite Technologique</label>
                                                    <input type="text" className="form-control" id="exampleInputUsername1" name='fonctionnalite' placeholder="fonctionnalite" onChange={(e) => setFonctionnalite(e.target.value)}/>
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

export default InsertFonctionnalite;
