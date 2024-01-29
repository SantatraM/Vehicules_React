import { useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

Chart.register(...registerables);
const Api_url = "https://vehiculespring-production-5f1a.up.railway.app";
function StatistiqueVendeur() {
  const location = useLocation();
  const mois = new URLSearchParams(location.search).get('mois');
  const annee = new URLSearchParams(location.search).get('annee');
  const nombre = new URLSearchParams(location.search).get('nombre');
  const [topSellersData, setTopSellersData] = useState([]);
  const [vendeurs, setVendeurs] = useState([]);
  const [annonces, setAnnonces] = useState([]);
  const chartRef = useRef(null);
    const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  if (!token) {
      navigate('/login');
  }

  const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
  };
  useEffect(() => {
    axios.post(Api_url+'/statistique/marque/' + mois + '/' + annee + '/' + nombre, {headers})
      .then(response => {
        if (Array.isArray(response.data.data)) {
          setAnnonces(response.data.data);
          console.log(response.data.data);
          const transformedData = response.data.data.map(item => {
            return item.nombre;
          });
          const VendeursData = response.data.data.map(data => {
            return data.nomMarque;
          });
          setTopSellersData(transformedData);
          setVendeurs(VendeursData);

          const ctx = chartRef.current.getContext('2d');
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: VendeursData, 
              datasets: [{
                label: 'Marque meilleur vendu',
                data: transformedData,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
              }],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }
      });
  }, []);

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <Header />
        <Sidebar />
    <div className="col-lg-6 grid-margin stretch-card mx-auto">
    <div className="card">
      <div className="card-body">
        <canvas id="barChart" ref={chartRef} width="400" height="200"></canvas>
      </div>
    </div>
  </div>
  </div>
  </div>
  );
}

export default StatistiqueVendeur;
