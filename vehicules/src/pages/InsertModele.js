import '../assets/vendors/typicons.font/font/typicons.css';
import '../assets/vendors/css/vendor.bundle.base.css';
import '../assets/css/vertical-layout-light/style.css';
import '../assets/js/hoverable-collapse.js';
import '../assets/js/off-canvas.js';
import '../assets/js/settings.js';
import '../assets/js/todolist.js';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import {useEffect , useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function InsertModele() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [nommodele, setNommodele] = useState([]);
    const [marques, setMarque] = useState([]);
    const [categories, setCategorie] = useState([]);
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    if( !token ) {
        navigate('/login');
    }
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    useEffect(() => {
        try {
            axios.get('http://localhost:8080/marques', { headers }).then(response => {
            if (Array.isArray(response.data.data)) {
                setMarque(response.data.data);
                console.log(response.data.data);
            } else {
                console.error('La réponse de l\'API n\'est pas un tableau JSON:', response.data);
            }
            });
            axios.get('http://localhost:8080/categories', { headers }).then(response => {
            if (Array.isArray(response.data.data)) {
                setCategorie(response.data.data);
                console.log(response.data.data);
            } else {
                console.error('La réponse de l\'API n\'est pas un tableau JSON:', response.data);
            }
            })
        } catch (error) {
            if (error.response && error.response.data && error.response.data.erreur) {
                setError(error.response.data.erreur);
            } else {
                console.log(error);
                setError("Une erreur inattendue s'est produite.");
            }
        }
    }, []); 

    const [idmarque, setId_marque] = useState ("");
    const [idcategorie, setId_categorie] = useState ("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const formdata = JSON.stringify({ idmarque, nommodele, idcategorie });
            console.log(formdata);
            const response = await axios.post("http:localhot:8080/modele", formdata, { headers });
            if (response.data.data != null) {
                setSuccess("Categorie "+ response.data.data.id +"inséré avec succès !");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.erreur) {
                setError(error.response.data.erreur);
            } else {
                setError("Une erreur inattendue s'est produite.");
            }
        }
    }

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
                                        <h4 className="card-title">Insertion Modele</h4>
                                            <form className="forms-sample" onSubmit={handleFormSubmit}>
                                                <div className="form-group">
                                                    <label>Modele</label>
                                                    <input type="text" className="form-control" id="exampleInputUsername1" name="modele" placeholder="nomModele" onChange={(e) => setNommodele(e.target.value)}/>
                                                </div>
                                                <div className="form-group ">
                                                    <label>Marque</label>
                                                    <select className="form-control" onChange={(e) => setId_marque(e.target.value)}>
                                                        {marques.map((marque) => (
                                                            <option key={marque.id} value={marque.id}>
                                                                {marque.nom_Marque}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="form-group ">
                                                    <label>Categorie</label>
                                                    <select className="form-control" onChange={(e) => setId_categorie(e.target.value)}>
                                                        {categories.map((categorie) => (
                                                        <option key={categorie.id} value={categorie.id}>
                                                            {categorie.nomCategorie}
                                                        </option>
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

export default InsertModele;
