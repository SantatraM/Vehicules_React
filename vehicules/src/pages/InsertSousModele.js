import React, {useEffect , useState } from 'react';
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
import axios from 'axios';

function InsertSousModele() {
    const [modeles, setModeles] = useState([]);
    const [carburants, setCarburants] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const [formData, setFormData] = useState ({
      nomSousModele:"",
      vitesseMax:"",
      consommation:"",
      idTypeCarburant:"",
      automatique: true,
      puissanceMoteur:"",
      batterie:"",
    });
  const [step, setStep] = useState(1);
    if( !token ) {
        navigate('/login');
    }
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };


  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    try {
      axios.get('http://localhost:8080/modeles', { headers }).then(response => {setModeles(response.data.data)});
      axios.get('http://localhost:8080/typecarburants', { headers }).then(response => {setCarburants(response.data.data)});

    } catch (error) {
      if (error.response && error.response.data && error.response.data.erreur) {
          setError(error.response.data.erreur);
      } else {
          console.log(error);
          setError("Une erreur inattendue s'est produite.");
      }
    }
  }, []); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(JSON.stringify({ formData }));
            const response = await axios.post("http://localhost:8080/sousmodele", JSON.stringify({ formData }), {headers});
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
                    <h4 className="card-title">Insertion Sous Modele</h4>
                    <form className="forms-sample" onSubmit={handleFormSubmit}>
                    {step === 1 && (
                      <>
                        <div className="form-group">
                          <input type="text" className="form-control" id="exampleInputUsername1" name="idmodele" hidden />
                        </div>
                        <div className="form-group ">
                          <label>Modele</label>
                          <select className="form-control"  >
                              {modeles.map((modele) => (
                                  <option key={modele.id} value={modele.id}>
                                      {modele.nom_modele}
                                  </option>
                              ))}
                          </select>
                        </div>
                        <div className="form-group">
                            <label >sous modele</label>
                            <input type="text" className="form-control"
                            name="nomSousModele"
                            value={formData.nomSousModele}
                            onChange={handleInputChange}/>
                        </div>
                        <div className="form-group">
                            <label>Vitesse Max</label>
                            <input type="number" className="form-control"
                            name="vitesseMax"
                            value={formData.vitesseMax}
                            onChange={handleInputChange}/>
                        </div>
                        <div className="form-group">
                            <label>Consommation</label>
                            <input type="number" className="form-control"
                            name="consommation"
                            value={formData.consommation}
                            onChange={handleInputChange}/>
                        </div>
                        
                        <button type="button" className="btn btn-primary mr-2" onClick={handleNext}>
                          Next
                        </button>
                        </>
                    )}
                    {step === 2 && (
                        <>
                        <div className="form-group ">
                            <label>Type Carburant</label>
                            <select className="form-control" 
                              name="idTypeCarburant"
                              value={formData.idTypeCarburant}
                              onChange={handleInputChange}>
                              {carburants.map((carburant) => (
                                <option key={carburant.id} value={carburant.id}>
                                    {carburant.nomTypeCarburant}
                                </option>
                              ))}
                            </select>
                        </div>
                        <div className="form-group ">
                            <label>Manuelle/Auto</label>
                            <select className="form-control"
                              name="automatique"
                              value={formData.automatique}
                              onChange={handleInputChange}>
                                <option value={false}>Manuelle</option>
                                <option value={true}>Automatique</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Puissance</label>
                            <input type="number" className="form-control" id="exampleInputUsername1"
                              name="puissanceMoteur"
                              value={formData.puissanceMoteur}
                              onChange={handleInputChange}/>
                        </div>
                        <div className="form-group">
                            <label>Batterie</label>
                            <input type="number" className="form-control" id="exampleInputUsername1" name="batterie"/>
                        </div>
                        <div className="form-group">
                            <label>Image</label>
                            <input type="file" name="img" className="" multiple/>
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}
                        <button type="button" className="btn btn-secondary mr-2" onClick={handlePrev}>
                          Previous
                        </button>
                        <button type="submit" className="btn btn-primary mr-2">
                          Submit
                        </button>
                        </>
                    )}
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

export default InsertSousModele;
