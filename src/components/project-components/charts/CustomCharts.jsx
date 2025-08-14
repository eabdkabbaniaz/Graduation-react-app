import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { getMarks } from "../../../api/marks";
import { authLang } from "../../../lang/authLang";
import { langs } from "../../../lang/langs";
import LangContext from "../../../context/LangContext";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function CustomCharts() {
  const [chartData, setChartData] = useState(null);
  const {lang , setLang} = useContext(LangContext)


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
              label: authLang[langs[lang]].finalGrade,
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
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">{authLang[langs[lang]].Marks}</h2>
      <div className="grid gap-6 mb-8 md:grid-cols-1">
        <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
          {authLang[langs[lang]].FinalGradesPerStudent}
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
                          text: authLang[langs[lang]].studentName,
                        },
                      },
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: authLang[langs[lang]].finalGrade,
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
