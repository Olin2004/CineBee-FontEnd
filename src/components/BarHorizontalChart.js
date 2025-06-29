import { BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarHorizontalChart = ({ data, labels, title }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: 'rgba(255,152,0,0.7)',
        borderRadius: 12,
        borderSkipped: false,
        barPercentage: 0.7,
        categoryPercentage: 0.7,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#ff9800',
        bodyColor: '#222',
        borderColor: '#ff9800',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(0,0,0,0.06)' },
        ticks: { color: '#222', font: { size: 13, weight: 500 } },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.06)' },
        ticks: { color: '#222', font: { size: 13, weight: 500 } },
      },
    },
    animation: { duration: 1200, easing: 'easeInOutQuart' },
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-full h-[260px] flex flex-col animate-fade-in-up">
      <div className="font-bold text-lg text-gray-800 mb-2">{title}</div>
      <div className="flex-1 w-full h-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarHorizontalChart;
