import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

function ListeCategorie() {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    if( !token ) {
        navigate('/login');
    }
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/categories', { headers })
      .then(response => {
        if (Array.isArray(response.data.data)) {
          setCategories(response.data.data);
          console.log(response.data.data);
        } else {
          console.error('La réponse de l\'API n\'est pas un tableau JSON:', response.data);
        }
      });
  });

  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5; // Number of items per page

  const pageCount = Math.ceil(categories.length / itemsPerPage);
  const offset = pageNumber * itemsPerPage;

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayedItems = categories.slice(offset, offset + itemsPerPage);

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <Header />
        <Sidebar />
        <div className="col-lg-6 grid-margin stretch-card mx-auto">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Liste des categories</h4>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>idCategorie</th>
                      <th>Categorie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedItems.map((categorie, index) => (
                      <tr key={index}>
                        <td>{categorie.id}</td>
                        <td>{categorie.nomCategorie}</td>
                        <td>
                            <Link to="" >
                            <button type="button" class="btn btn-success btn-rounded btn-icon">
                              <i class="typcn typcn-edit"></i>
                            </button>
                            </Link>
                        </td>
                        <td>
                            <Link to="" >
                            <button type="button" class="btn btn-danger btn-rounded btn-icon">
                              <i class="typcn typcn-trash"></i>
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
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
              />
              <Link to="/insert-categorie" className="btn btn-primary btn-lg btn-block">
                <i className="typcn typcn-user"></i>
                Insertion Categorie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListeCategorie;
