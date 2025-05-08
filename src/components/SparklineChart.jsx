import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const SparklineChart = ({ data, change }) => {
  // Skip if no data
  if (!data || data.length === 0) {
    return <div className="text-gray-400 text-center text-sm">No data available</div>;
  }

  // Determine color based on price change
  const isPositive = change >= 0;
  const lineColor = isPositive ? 'rgba(16, 185, 129, 1)' : 'rgba(239, 68, 68, 1)';
  const fillColor = isPositive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)';
  const pointColor = isPositive ? 'rgba(16, 185, 129, 1)' : 'rgba(239, 68, 68, 1)';

  // Generate labels (days)
  const labels = Array.from({ length: data.length }, (_, i) => i);

  // Process data to smooth out extreme values
  const chartData = {
    labels,
    datasets: [
      {
        data,
        fill: true,
        backgroundColor: fillColor,
        borderColor: lineColor,
        borderWidth: 2,
        tension: 0.4, // Smoother curve
        pointRadius: 0,
        pointHoverRadius: 3,
        pointHoverBackgroundColor: pointColor,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        titleFont: {
          size: 12,
          weight: 'bold'
        },
        bodyFont: {
          size: 11
        },
        padding: 8,
        cornerRadius: 4,
        displayColors: false,
        callbacks: {
          title: (tooltipItems) => {
            // The tooltip will show "Day X"
            return `Day ${tooltipItems[0].dataIndex + 1}`;
          },
          label: (context) => {
            const value = context.raw;
            return `$${value.toFixed(2)}`;
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false
        }
      },
      y: {
        display: false,
        grid: {
          display: false
        },
        min: Math.min(...data) * 0.95, // Add a little padding to the bottom
        max: Math.max(...data) * 1.05  // Add a little padding to the top
      }
    },
    elements: {
      point: {
        radius: 0
      }
    },
    animation: {
      duration: 1500,
      easing: 'easeOutQuart'
    }
  };

  return (
    <div className="w-full h-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default React.memo(SparklineChart);