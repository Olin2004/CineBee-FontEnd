import { BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip } from 'chart.js';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StatisticsChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.genre),
    datasets: [
      {
        label: 'Số lượng phim',
        data: data.map((item) => item.count),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>Thống kê số lượng phim theo thể loại</Card.Title>
        <div style={{ height: 300 }}>
          <Bar
            data={chartData}
            options={{ responsive: true, plugins: { legend: { display: false } } }}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default StatisticsChart;
