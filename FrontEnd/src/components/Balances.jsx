// balances.jsx

import React from "react";

const calculateTotals = (expense) => {
  // Filter expenses based on type and sum up amounts separately for income and expenses
  const totalIncome = expense
    .filter((exp) => exp.type === "Income")
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  const totalExpenses = expense
    .filter((exp) => exp.type === "Expense")
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  const netBalance = totalIncome - totalExpenses;

  return { totalIncome, totalExpenses, netBalance };
};

const NetBalance = ({ netBalance }) => {
  return (
    <div className="balance-box">
    <h3>Net Balance</h3>
    <p>${netBalance}</p>
  </div>
  );
};

const TotalIncome = ({ totalIncome }) => {
  return (
    <div className="balance-box">
    <h3>Total Income</h3>
    <p>${totalIncome}</p>
  </div>
  );
};

const TotalExpenses = ({ totalExpenses }) => {
  return (
    <div className="balance-box">
    <h3>Total Expenses</h3>
    <p>${totalExpenses}</p>
  </div>
  );
};

const Balances = ({ expense }) => {
  const { totalIncome, totalExpenses, netBalance } = calculateTotals(expense);

  return (
    <>
      <TotalIncome totalIncome={totalIncome} />
      <TotalExpenses totalExpenses={totalExpenses} />
      <NetBalance netBalance={netBalance} />
    </>
  );
};

export default Balances;
