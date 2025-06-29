import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

// Plugin shadow cho point
const pointShadowPlugin = {
  id: 'pointShadow',
  afterDatasetsDraw: (chart) => {
    const ctx = chart.ctx;
    chart.data.datasets.forEach((dataset, i) => {
      if (chart.isDatasetVisible(i)) {
        const meta = chart.getDatasetMeta(i);
        if (dataset.label === 'Revenue') {
          meta.data.forEach((point) => {
            ctx.save();
            ctx.shadowColor = 'rgba(255,152,0,0.35)';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.restore();
          });
        }
      }
    });
  },
};

const StatisticsLineChart = ({ data, labels, fullBlock }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Revenue',
        data: data,
        borderColor: '#ff9800',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 180);
          gradient.addColorStop(0, 'rgba(255,152,0,0.15)');
          gradient.addColorStop(1, 'rgba(255,152,0,0)');
          return gradient;
        },
        borderWidth: 5,
        tension: 0.45,
        pointRadius: 8,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#ff9800',
        pointBorderWidth: 4,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#ff9800',
        pointHoverBorderWidth: 4,
        fill: true,
        order: 1,
      },
      {
        label: 'Order',
        data: [4000, 5000, 6000, 8000, 9000, 6000, 5000, 6000],
        borderColor: '#ff9800',
        borderDash: [6, 6],
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        fill: false,
        order: 2,
        backgroundColor: 'transparent',
      },
    ],
  };

  const minY = Math.max(0, Math.min(...data) - 1000);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: '#fff',
        titleColor: '#ff9800',
        bodyColor: '#222',
        borderColor: '#ff9800',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: $${ctx.formattedValue}`,
        },
      },
    },
    layout: { padding: 0 },
    scales: {
      x: {
        grid: {
          color: (ctx) =>
            ctx.tick && ctx.tick.value === 0 ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.04)',
          lineWidth: 1,
          drawOnChartArea: true,
          drawTicks: false,
        },
        ticks: { color: '#222', font: { size: 13, weight: 500 } },
      },
      y: {
        grid: {
          color: 'rgba(0,0,0,0.12)',
          lineWidth: 1.5,
          drawOnChartArea: true,
          drawTicks: false,
        },
        ticks: { color: '#222', font: { size: 13, weight: 500 } },
        beginAtZero: false,
        min: minY,
      },
    },
    elements: {
      line: { borderJoinStyle: 'round' },
      point: {},
    },
    animation: { duration: 1200, easing: 'easeInOutQuart' },
  };

  // Custom legend giống mẫu đẹp
  return (
    <div className="w-full h-full flex flex-col bg-white/90 rounded-3xl shadow-2xl backdrop-blur-md transition-all duration-300 animate-fade-in-up">
      <div className="flex items-center gap-6 px-4 pt-2 pb-1">
        <span className="flex items-center gap-1 text-base font-semibold text-gray-800">
          <span className="inline-block w-4 h-2 rounded bg-[#ff9800] mr-1" /> Revenue
        </span>
        <span className="flex items-center gap-1 text-base font-semibold text-gray-400">
          <span className="inline-block w-4 h-2 rounded border border-[#ff9800] bg-transparent mr-1" />{' '}
          Order
        </span>
      </div>
      <div className="flex-1 w-full h-[220px]">
        <Line data={chartData} options={options} plugins={[pointShadowPlugin]} />
      </div>
    </div>
  );
};

export default StatisticsLineChart;
