import React, { useState , useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import './css/pagination.css';

function ListeMarque() {
  const [marques, setMarques] = useState([
  ]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5; // Nombre d'éléments par page

  if( !token ) {
      navigate('/login');
  }
  const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
  };

  useEffect(() => {
    axios.get('http://localhost:8080/marques', { headers })
      .then(response => {
        if (Array.isArray(response.data.data)) {
          setMarques(response.data.data);
          console.log(response.data.data);
        } else {
          console.error('La réponse de l\'API n\'est pas un tableau JSON:', response.data);
        }
      });
  }, []);

  const pageCount = Math.ceil(marques.length / itemsPerPage);
  const offset = pageNumber * itemsPerPage;

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayedItems = marques.slice(offset, offset + itemsPerPage);

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <Header />
        <Sidebar />
        <div className="col-lg-6 grid-margin stretch-card mx-auto">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Liste des marques</h4>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Marque</th>
                      <th>Pays</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedItems.map((marque, index) => (
                      <tr key={index}>
                        <td>{marque.id}</td>
                        <td>{marque.nom_Marque}</td>
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
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
              />
              <Link to="/insert-marque" className="btn btn-primary btn-lg btn-block">
                <i className="typcn typcn-user"></i>
                Insertion marque
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListeMarque;
