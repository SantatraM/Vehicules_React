import React, { useState , useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../assets/vendors/typicons.font/font/typicons.css';
import '../assets/vendors/css/vendor.bundle.base.css';
import '../assets/css/vertical-layout-light/style.css';
import '../assets/js/hoverable-collapse.js';
import '../assets/js/off-canvas.js';
import '../assets/js/settings.js';
import '../assets/js/todolist.js';
// import '../assets/vendors/mdi/css/materialdesignicons.min.css';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';
import './css/pagination.css';

function ListeAnnonceNonValide() {
 
  const [annonces , setAnnonces] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8081/annoncesNonValides')
      .then(response => {
        if (Array.isArray(response.data.data)) {
          setAnnonces(response.data.data);
          console.log(response.data.data);
        } else {
          console.error('La réponse de l\'API n\'est pas un tableau JSON:', response.data);
        }
      });
  }, []);

  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 4; // Number of items per page

  const pageCount = Math.ceil(annonces.length / itemsPerPage);
  const offset = pageNumber * itemsPerPage;

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayedItems = annonces.slice(offset, offset + itemsPerPage);

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <Header />
        <Sidebar />
        <div className="main-panel">
        <div className="content-wrapper">
          <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Listes des annonces non valide</h4>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Utilisateur</th>
                        <th>Modele</th>
                        <th>prix</th>
                        <th>date annonce</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                        {displayedItems.map((annonce, index) => (
                        <tr key={index}>
                            <td>{annonce.utilisateur}</td>
                            <td>{annonce.sousModele}</td>
                            <td>{annonce.prix}</td>
                            <td>{annonce.dateAnnonce}</td>
                            <td>
                            <Link to="" >
                              <button className="btn btn-success btn-rounded btn-icon">
                                <i className="mdi mdi-check"></i>
                              </button>
                            </Link>
                            </td>
                            <td>
                            <Link to="" >
                              <button className="btn btn-danger btn-rounded btn-icon">
                                <i className="typcn typcn-times"></i>
                              </button>
                            </Link>
                            </td>
                            <td>
                            <Link to="" className="btn btn-info">
                                Details
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
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
              />
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
  );
}

export default ListeAnnonceNonValide;


