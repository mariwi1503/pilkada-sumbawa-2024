import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart } from "chart.js";

Chart.register(ChartDataLabels);

function ChartGubernurComponent() {
  const chartValues = {
    1000039: 762751,
    1000040: 870763,
    1000041: 1139690,
  };
  const progress = {
    total: 8405,
    persen: 98.49,
    progres: 8278,
  };
  const [chartData, setChartData] = useState(chartValues);
  const [progres, setProgres] = useState(progress);
  const [isLoading, setIsLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [updatedAt, setUpdatedAt] = useState("2024-11-27 23:15:00");

  useEffect(() => {
    fetch(
      "https://sirekappilkada-obj-data.kpu.go.id/pilkada/hhcw/pkwkp/52.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const chartValues = data.tungsura.chart;
        const progress = data.tungsura.chart.progres;

        setChartData(chartValues);
        setProgres(progress);
        setUpdatedAt(data.ts);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsSmallScreen(mediaQuery.matches);

    const handleResize = () => setIsSmallScreen(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const labels = ["Rohmi - Pirin", "Zul - Uhel", "Iqbal - Dinda"];
  const hardCode = ["1000039", "1000040", "1000041"];
  const dataValues = hardCode.map((key) => chartData[key]);
  const totalVotes = dataValues.reduce((sum, value) => sum + value, 0);
  const percentages = dataValues.map((value) =>
    ((value / totalVotes) * 100).toFixed(1)
  );

  const data = {
    labels,
    datasets: [
      {
        label: `Diperbarui pada: ${updatedAt}`,
        data: dataValues,
        backgroundColor: ["#4CAF50", "#2196F3", "#FF9800"],
        borderColor: ["#388E3C", "#1976D2", "#F57C00"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        anchor: "center",
        align: "center",
        padding: 5,
        formatter: (value, context) => `${percentages[context.dataIndex]}%`,
        color: "#fff",
        font: {
          weight: "bold",
          size: 12,
        },
      },
    },
    scales: !isSmallScreen
      ? {
          x: {
            title: {
              display: true,
              color: "#111827",
            },
          },
          y: {
            max: 1500000,
            title: {
              display: true,
              text: "Jumlah Suara",
              color: "#111827",
            },
          },
        }
      : undefined,
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-200 via-blue-300 to-blue-500 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-white mb-4">Pilgub NTB 2024</h1>

      {/* Chart Section */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg">
        {isSmallScreen ? (
          <Pie data={data} options={options} />
        ) : (
          <Bar data={data} options={options} />
        )}
      </div>

      {/* Informasi Progress Section */}
      <div className="w-full max-w-4xl mt-4">
        <div className="relative pt-1">
          <div className="mb-2">
            <span className="text-gray-700 font-semibold">
              Suara masuk: {progres.persen}%
            </span>
          </div>
          <div className="flex mb-2">
            <div className="relative flex-1">
              <div className="flex mb-2">
                <div className="w-full bg-gray-200 rounded-full h-5">
                  <div
                    className="bg-gradient-to-r from-red-200 to-red-500 h-5 rounded-full"
                    style={{ width: `${progres.persen}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      {/* <div className="w-full lg:w-1/2 relative bg-orange-400 p-4 text-center rounded-lg mt-4">
        <span className="text-lg font-bold text-white animate-bounce">
          🎉 Iqbal Dinda memimpin 🎉
        </span>
      </div> */}

      {/* Navigation Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-sm font-semibold"
        >
          Home
        </button>
        <button
          onClick={() => (window.location.href = "/bupati")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-sm font-semibold"
        >
          Hasil Perhitungan Bupati
        </button>
      </div>
    </div>
  );
}

export default ChartGubernurComponent;
