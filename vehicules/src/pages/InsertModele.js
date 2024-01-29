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

function InsertModele() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [marques, setMarque] = useState([]);
    const [categories, setCategorie] = useState([]);

    useEffect(() => {
        try {
            axios.get('http://localhost:8081/marques').then(response => {
            if (Array.isArray(response.data.data)) {
                setMarque(response.data.data);
                console.log(response.data.data);
            } else {
                console.error('La réponse de l\'API n\'est pas un tableau JSON:', response.data);
            }
            });
            axios.get('http://localhost:8081/categories').then(response => {
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

    const [id_marque, setId_marque] = useState ("");
    const [id_categorie, setId_categorie] = useState ("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http:localhot:8080/modele", JSON.stringify({ id_marque, id_categorie }));
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
                                                    <input type="text" className="form-control" id="exampleInputUsername1" name="modele" placeholder="nomModele"/>
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
                                                            {categorie.id}
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
