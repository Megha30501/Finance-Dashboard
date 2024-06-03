import React, { useState } from "react";
import ExpensePieChart from "./ExpensePieChart";
import IncomePieChart from "./IncomePieChart";
import UpdateExpenseForm from "./UpdateExpenseForm";
import Balances from "./Balances";
import "../css/expenselist.css";

const ExpenseList = ({ expenselist, onDelete, showSummary, onUpdate }) => {
  const [filterCriteria, setFilterCriteria] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  // Sorting function
  const sortedExpenses = expenselist.slice().sort((a, b) => {
    if (sortCriteria === "category") {
      return sortOrder === "asc"
        ? a.category.localeCompare(b.category)
        : b.category.localeCompare(a.category);
    } else if (sortCriteria === "date") {
      return sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  // Filtering function
  const filteredExpenses = sortedExpenses.filter(
    (expense) =>
      expense.description
        .toLowerCase()
        .includes(filterCriteria.toLowerCase()) ||
      expense.type.toLowerCase().includes(filterCriteria.toLowerCase()) ||
      expense.category.toLowerCase().includes(filterCriteria.toLowerCase())
  );

  const handleFilterChange = (event) => {
    setFilterCriteria(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleOrderChange = (event) => {
    setSortOrder(event.target.value);
  };
  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };
  const handleClosePopup = () => {
    setSelectedTransaction(null);
  };
  return (
    <div className="transaction-list">
      {showSummary && (
        <div className="balance-container">
          <div className="header-filter-sort-container">
            <header className="header">
              <div>
                <h1>Expense Tracker</h1>
                <p>Welcome Back</p>
              </div>
            </header>
            <div className="filter-sort-container">
              <div className="filter">
                <label htmlFor="filter">Filter by:</label>
                <input
                  type="text"
                  value={filterCriteria}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="sort">
                <label htmlFor="sort">Sort by:</label>
                <div className="cat-sort">
                <select
                  id="sort"
                  value={sortCriteria}
                  onChange={handleSortChange}
                >
                  <option value="category">Category</option>
                  <option value="date">Date</option>
                </select>
                </div>
                <div className="value-sort">
                <select value={sortOrder} onChange={handleOrderChange}>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
                </div>
              </div>
            </div>
          </div>
          <div className="balance-summary-container">
            <Balances expense={expenselist} />
          </div>
          
        </div>
      )}
      
      <div className="expense-list-container">
  <div className="list-container">
    <ul>
      {filteredExpenses.map((exp) => (
        <li key={exp.id} className="transaction-item">
            <div>
            {exp.category}
          </div>
          <div>
         {exp.description}
          </div>
          <div>
         ${exp.amount}
          </div>
          <button onClick={() => handleTransactionClick(exp)}>
                  View
                </button>
        </li>
      ))}
    </ul>
  </div>
  <div className="pie-charts-container">

    <div className="expense-pie-chart">
    <p>Expense Pie Chart</p>
      <ExpensePieChart expenseList={expenselist} />
    </div>
    <div className="income-pie-chart">
    <p>Income Pie Chart</p>
      <IncomePieChart expenseList={expenselist} />
    </div>
  </div>
</div>
      {selectedTransaction && (
  <div className="dialog-box">
    <div className="dialog-content">
      <div className="dialog-header">
        <h2>Transaction Details</h2>
        <button onClick={handleClosePopup} className="close-button">X</button>
      </div>
      <div className="dialog-body">
        <div>
          <strong>Description:</strong> {selectedTransaction.description}
        </div>
        <div>
          <strong>Amount:</strong> ${selectedTransaction.amount}
        </div>
        <div>
          <strong>Type:</strong> {selectedTransaction.type}
        </div>
        <div>
          <strong>Category:</strong> {selectedTransaction.category}
        </div>
        <div>
          <strong>Date:</strong> {selectedTransaction.date}
        </div>
      </div>
      <div className="dialog-footer">
        <button onClick={() => onDelete(selectedTransaction.id)}>Delete</button>
        <UpdateExpenseForm expense={selectedTransaction} onUpdate={onUpdate} />
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default ExpenseList;
