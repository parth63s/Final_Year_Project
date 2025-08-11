  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { Line } from "react-chartjs-2";
  import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
  } from "chart.js";

  ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

  function DailyLineChart() {
    const [chartData, setChartData] = useState({
      labels: [],
      datasets: [],
    });

    const [summary, setSummary] = useState({
      totalProfit: 0,
      totalSubscriptions: 0,
      totalMembers: 0,
    });

    useEffect(() => {
      axios.get("http://localhost:5000/api/subscriptions/daily-summary", {withCredentials: true})
        .then((res) => {
          const { dailyData, totalProfit, totalMembers, totalSubscriptions } = res.data;

          const labels = dailyData.map(item =>
            new Date(item.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short"
            })
          );

          const data = dailyData.map(item => item.count);

          setChartData({
            labels,
            datasets: [
              {
                label: "Daily Subscriptions",
                data,
                fill: false,
                borderColor: "#36A2EB",
                backgroundColor: "#36A2EB",
                tension: 0.3,
                pointRadius: 4,
                pointHoverRadius: 6,
              },
            ],
          });

          setSummary({
            totalProfit,
            totalMembers,
            totalSubscriptions,
          });
        })
        .catch((err) => console.error("Chart error:", err));
    }, []);

    return (
      <section className="dashboard-section row">
        {/* Line Chart */}
        <div className="col-md-8">
          <h2>📈 Daily Subscriptions</h2>
          <div style={{ width: "100%", maxWidth: 800 }}>
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true, position: "top" },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.parsed.y} subscriptions`,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Summary */}
        <div className="col-md-4">
          <h2>💼 Summary</h2>
          <div className="card p-3 shadow-sm rounded-3">
            <p><strong>📦 Subscriptions:</strong> {summary.totalSubscriptions}</p>
            <p><strong>👥 Members:</strong> {summary.totalMembers}</p>
            <p><strong>💰 Profit:</strong> ₹{summary.totalProfit.toFixed(2)}</p>
              <button className="btn btn-success fs-5" >
                  Withdrawal
              </button>
          </div>
        </div>
      </section>
    );
  }

  export default DailyLineChart;
