import React, { useEffect } from "react";
import Chart from "chart.js/auto";

const IncomePieChart = ({ expenseList }) => {
  useEffect(() => {
    const ctx = document.getElementById("incomeChart").getContext("2d");

    // Filter expenses to include only income (type === 'Income')
    const incomeData = expenseList.filter((exp) => exp.type === "Income");
    const incomeCategories = incomeData.reduce((acc, exp) => {
      const category = exp.category;
      acc[category] = (acc[category] || 0) + exp.amount;
      return acc;
    }, {});
    const categoryLabels = Object.keys(incomeCategories);
    const categoryData = Object.values(incomeCategories);

    const chartConfig = {
      type: "pie",
      data: {
        labels: categoryLabels,
        datasets: [
          {
            label: "Income Categories",
            data: categoryData,
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 205, 86, 1)",
              "rgba(54, 162, 235, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    };
    const incomeChart = new Chart(ctx, chartConfig);

    return () => {
      incomeChart.destroy();
    };
  }, [expenseList]);

  return <canvas id="incomeChart" width="400" height="200"></canvas>;
};

export default IncomePieChart;
