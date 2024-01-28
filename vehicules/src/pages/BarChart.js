import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js'; 
import '../assets/vendors/typicons.font/font/typicons.css';
import '../assets/vendors/css/vendor.bundle.base.css';
import '../assets/css/vertical-layout-light/style.css';
import '../assets/js/hoverable-collapse.js';
import '../assets/js/off-canvas.js';
import '../assets/js/settings.js';
import '../assets/js/todolist.js';

// Register required chart types and scales
Chart.register(...registerables);

const BarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const topSellersData = [50, 45, 40, 35, 30];

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Vendeur 1', 'Vendeur 2', 'Vendeur 3', 'Vendeur 4', 'Vendeur 5'],
        datasets: [{
          label: 'Top 5 Vendeurs du Mois',
          data: topSellersData,
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
  }, []);

  return (
    <div class="col-lg-6 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        {/* <h4 class="card-title">Bar chart</h4> */}
        <canvas id="barChart" ref={chartRef} width="400" height="200"></canvas>
      </div>
    </div>
  </div>
  );
};

export default BarChart;
