import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { getMarks } from "../../../api/marks";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function CustomCharts() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const marks = await getMarks();

        const labels = marks.map(mark => mark.user_name);
        const data = marks.map(mark => mark.final_grade);

        setChartData({
          labels,
          datasets: [
            {
              label: "Final Grade",
              data,
              backgroundColor: "rgba(59, 130, 246, 0.6)",
              borderRadius: 8,
            }
          ]
        });
      } catch (err) {
        console.error("Error loading marks for chart", err);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Marks</h2>
      <div className="grid gap-6 mb-8 md:grid-cols-1">
        <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
            Final Grades per Student
          </h4>

          {chartData ? (
            <div className="overflow-x-auto">
              <div className="min-w-[1000px]">
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: true,
                        position: "top",
                      },
                    },
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Student Name",
                        },
                      },
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: "Final Grade",
                        },
                        max: 100,
                      },
                    },
                  }}
                />
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading chart...</p>
          )}
        </div>
      </div>
    </>
  );
}
