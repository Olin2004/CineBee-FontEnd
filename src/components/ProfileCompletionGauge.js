import { ArcElement, Chart, Tooltip } from 'chart.js';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip);

const ProfileCompletionGauge = ({ value = 70, min = 0, max = 100 }) => {
  const percent = Math.max(min, Math.min(value, max));
  const chartData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [percent, max - percent],
        backgroundColor: ['#26c6da', '#e0e0e0'],
        borderWidth: 0,
        cutout: '80%',
        circumference: 180,
        rotation: 270,
      },
    ],
  };
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>Profile Completion</Card.Title>
        <div style={{ height: 160, marginTop: 10, marginBottom: 10 }}>
          <Doughnut
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              cutout: '80%',
              circumference: 180,
              rotation: 270,
            }}
          />
        </div>
        <div className="text-center font-bold text-xl text-cyan-600">{percent}%</div>
      </Card.Body>
    </Card>
  );
};

export default ProfileCompletionGauge;
