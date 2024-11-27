import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';

Chart.register(ChartDataLabels);

const DataVisualization = () => {
  const [chartData, setChartData] = useState({});
  const [progres, setProgres] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    fetch('https://sirekappilkada-obj-data.kpu.go.id/pilkada/hhcw/pkwkk/52/5204.json')
      .then((response) => response.json())
      .then((data) => {
        const chartValues = data.tungsura.chart;
        const progress = data.tungsura.chart.progres;

        setChartData(chartValues);
        setProgres(progress);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsSmallScreen(mediaQuery.matches);

    const handleResize = () => setIsSmallScreen(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const labels = ['01', '02', '03', '04'];
  const hardCode = ['1000865', '1000866', '1000867', '1000868'];
  const dataValues = hardCode.map((key) => chartData[key]);
  const totalVotes = dataValues.reduce((sum, value) => sum + value, 0);
  const percentages = dataValues.map((value) => ((value / totalVotes) * 100).toFixed(1));

  const data = {
    labels,
    datasets: [
      {
        label: 'Grafik voting',
        data: dataValues,
        backgroundColor: ['#4CAF50', '#2196F3', '#FF9800', '#F44336'],
        borderColor: ['#388E3C', '#1976D2', '#F57C00', '#D32F2F'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        anchor: 'center', // Menempatkan label di tengah segmen
        align: 'center',
        padding: 5, // Tambahkan jarak agar tidak terlalu dekat dengan batas segmen
        formatter: (value, context) => `${percentages[context.dataIndex]}%`,
        color: '#fff', // Pastikan warna label kontras
        font: {
          weight: 'bold',
          size: 12,
        },
      },
    },
    scales: !isSmallScreen
      ? {
          x: {
            title: {
              display: true,
              color: '#111827',
            },
          },
          y: {
            max: 120000, // Atur nilai maksimal sumbu y
            title: {
              display: true,
              text: 'Jumlah Suara',
              color: '#111827',
            },
          },
        }
      : undefined,
  };
  
  

  return (
    <div className="p-6 bg-gradient-to-r from-teal-200 via-green-300 to-blue-400 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-white mb-4">Pilkada Sumbawa 2024</h1>

      {/* Chart Section */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        {isSmallScreen ? <Pie data={data} options={options} /> : <Bar data={data} options={options} />}
      </div>

      {/* Informasi Progress Section */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mt-6">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="font-semibold text-gray-700">Progress: {progres.persen}%</span>
            </div>
          </div>
          <div className="flex mb-2">
            <div className="relative flex-1">
              <div className="flex mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${progres.persen}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className="w-full relative bg-blue-500 p-4 text-center rounded-lg mt-8 shadow-lg overflow-hidden glow">
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <div className="confetti"></div>
        <span className="text-lg font-bold text-white animate-bounce">🎉 Jarot Nasori Menang! 🎉</span>
      </div>


    </div>
  );
};

export default DataVisualization;
