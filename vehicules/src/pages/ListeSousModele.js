import React, { useState, useEffect}  from 'react';
import ReactPaginate from 'react-paginate';
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
import { Link } from 'react-router-dom';
import './css/pagination.css';
import axios from 'axios';

function ListeSousModele() {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  const [SousModeles, setSousModeles] = useState([]);
  if( !token ) {
      navigate('/login');
  }
  const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
  };

  useEffect(() => {
    axios.get('http://localhost:8080/sousModeles', { headers })
    .then(response => {
        console.log(response);
        if (Array.isArray(response.data)) {
          setSousModeles(response.data);
        } else {
          console.error('La réponse de l\'API n\'est pas un tableau JSON:', response.data);
        }
      });
  });

  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5; // Number of items per page

  const pageCount = Math.ceil(SousModeles.length / itemsPerPage);
  const offset = pageNumber * itemsPerPage;


  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayedItems = SousModeles.slice(offset, offset + itemsPerPage);

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <Header />
        <Sidebar />
        <div className="col-lg-6 grid-margin stretch-card mx-auto">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Liste des sous modeles</h4>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Modele</th>
                      <th>Sous modele</th>
                      <th>Vitesse Max</th>
                      <th>Consommation</th>
                      <th>Type carburant</th>
                      <th>Puissance Moteur</th>
                      <th>Baterie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SousModeles.map((item, index) => (
                      <tr key={index}>
                        <td>{item.modele.nommodele}</td>
                        <td>{item.nomsous}</td>
                        <td>{item.vitessemax}</td>
                        <td>{item.consommation}</td>
                        <td>{item.typeCarburant.nomtypecarburant}</td>
                        <td>{item.puissancemoteur}</td>
                        <td>{item.batterie}</td>
                        <td>
                            <Link to="" >
                            <button type="button" className="btn btn-success btn-rounded btn-icon">
                              <i className="typcn typcn-edit"></i>
                            </button>
                            </Link>
                        </td>
                            <td>
                            <Link to="" >
                            <button type="button" className="btn btn-danger btn-rounded btn-icon">
                              <i className="typcn typcn-trash"></i>
                            </button>
                            </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}country
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
              />
              <Link to="/insert-sousModele" className="btn btn-primary btn-lg btn-block">
                <i className="typcn typcn-user"></i>
                Insertion sous Modele
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListeSousModele;
