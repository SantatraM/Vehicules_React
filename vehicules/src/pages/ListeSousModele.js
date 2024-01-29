import React, { useState } from 'react';
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

function ListeSousModele() {
  const [data, setData] = useState([
    { name: 'Jacob', country: 'Photoshop' ,reglage: 'automatique'},
    { name: 'Messy', country: 'Flash' ,reglage: 'automatique'},
    { name: 'John', country: 'Premier' ,reglage: 'automatique'},
    { name: 'Peter', country: 'After effects',reglage: 'automatique' },
    { name: 'Dave', country: '53275535',reglage: 'automatique' },
    { name: 'Dave', country: '53275535' ,reglage: 'automatique'},
  ]);

  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5; // Number of items per page

  const pageCount = Math.ceil(data.length / itemsPerPage);
  const offset = pageNumber * itemsPerPage;

  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  if( !token ) {
      navigate('/login');
  }
  const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
  };

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayedItems = data.slice(offset, offset + itemsPerPage);

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
                      <th>Sous modele</th>
                      <th>Vitesse Max</th>
                      <th>Consommation</th>
                      <th>Type carburant</th>
                      <th>Puissance Moteur</th>
                      <th>Baterie</th>
                      <th>reglage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.country}</td>
                        <td>{item.country}</td>
                        <td>{item.name}</td>
                        <td>{item.country}</td>
                        <td>{item.name}</td>
                        <td>{item.reglage}</td>
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
