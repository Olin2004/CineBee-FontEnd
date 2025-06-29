import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data, labels, title }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: ['#36A2EB', '#4BC0C0', '#FFCE56', '#FF6384', '#9966FF', '#FF9F40'],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <div style={{ height: 220 }}>
          <Doughnut
            data={chartData}
            options={{ responsive: true, plugins: { legend: { position: 'right' } } }}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default DoughnutChart;
