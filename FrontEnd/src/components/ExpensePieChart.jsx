import React, { useEffect } from "react";
import Chart from "chart.js/auto";

const ExpensePieChart = ({ expenseList }) => {
  useEffect(() => {
    const ctx = document.getElementById("expenseChart").getContext("2d");
    const expenseData = expenseList.filter((exp) => exp.type === "Expense");
    const expenseCategories = expenseData.reduce((acc, exp) => {
      const category = exp.category;
      acc[category] = (acc[category] || 0) + exp.amount;
      return acc;
    }, {});
    const categoryLabels = Object.keys(expenseCategories);
    const categoryData = Object.values(expenseCategories);

    const chartConfig = {
      type: "pie",
      data: {
        labels: categoryLabels,
        datasets: [
          {
            label: "Expense Categories",
            data: categoryData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    };
    const expenseChart = new Chart(ctx, chartConfig);

    return () => {
      expenseChart.destroy();
    };
  }, [expenseList]);

  return <canvas id="expenseChart" width="400" height="200"></canvas>;
};

export default ExpensePieChart;
