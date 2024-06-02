import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import expenseservice from "./services/expense";
import Balances from "./components/Balances";
import AddExpense from "./components/AddExpenseForm";
import UpdateExpenseForm from "./components/UpdateExpenseForm";
import Notification from "./components/Notification";
import ExpensePieChart from "./components/ExpensePieChart";
import IncomePieChart from "./components/IncomePieChart";
import './app.css'

const ExpenseList = ({ expenselist, onDelete, showSummary, onUpdate }) => {
  const [filterCriteria, setFilterCriteria] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [sortOrder, setSortOrder] = useState('');

 // Sorting function
 const sortedExpenses = expenselist.slice().sort((a, b) => {
  if (sortCriteria === 'category') {
    return sortOrder === 'asc' ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category);
  } else if (sortCriteria === 'date') {
    return sortOrder === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
  }
  return 0;
});
 // Filtering function
 const filteredExpenses = sortedExpenses.filter(expense =>
  expense.description.toLowerCase().includes(filterCriteria.toLowerCase()) ||
  expense.type.toLowerCase().includes(filterCriteria.toLowerCase()) ||
  expense.category.toLowerCase().includes(filterCriteria.toLowerCase())
);
const handleFilterChange = (event) => {
  setFilterCriteria(event.target.value);
}

const handleSortChange = (event) => {
  setSortCriteria(event.target.value);
};

const handleOrderChange = (event) => {
  setSortOrder(event.target.value);
};

return (
  <div className="transaction-list">
    {showSummary && (
      <div className="balance-container">
        <div className="filter-sort-container">
          <div className="filter">
            <label htmlFor="filter">Filter by:</label>
            <input type="text" value={filterCriteria} onChange={handleFilterChange} />
          </div>
          <div className="sort">
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" value={sortCriteria} onChange={handleSortChange}>
              <option value="category">Category</option>
              <option value="date">Date</option>
            </select>
            <select value={sortOrder} onChange={handleOrderChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <div className="balance-summary-container">
          <Balances expense={expenselist} />
        </div>
        <div className="pie-charts-container">
        <div className="expense-pie-chart">
          <ExpensePieChart expenseList={expenselist} />
        </div>
        <div className="income-pie-chart">
          <IncomePieChart expenseList={expenselist} />
        </div>
        </div>
      </div>
    )}
 <div className="expense-list-container">
    <ul>
      {filteredExpenses.map((exp) => (
        <li key={exp.id} className="transaction-item">
          <div>
            <strong>Description:</strong> {exp.description}
          </div>
          <div>
            <strong>Amount:</strong> ${exp.amount}
          </div>
          <div>
            <strong>Type:</strong> {exp.type}
          </div>
          <div>
            <strong>Category:</strong> {exp.category}
          </div>
          <div>
            <strong>Date:</strong> {exp.date}
          </div>
          <button onClick={() => onDelete(exp.id)}>Delete</button>
          <UpdateExpenseForm expense={exp} onUpdate={onUpdate} />
        </li>
      ))}
    </ul>

    </div>
  </div>
);
};

const App = () => {
  const [expense, setExpense] = useState([]);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    // Fetch expenses when component mounts
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    expenseservice
      .getAll()
      .then((expenses) => {
        setExpense(expenses);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  };

  const addExpense = (expenseObject) => {
    expenseservice
      .create(expenseObject)
      .then((returnedExpense) => {
        setExpense([...expense, returnedExpense]);
        setNotification({
          message: "A New Expense has been added successfully!",
          type: "success",
        });
        setTimeout(() => {
          setNotification({ message: null, type: null });
        }, 5000);
      })
      .catch((error) => {
        setNotification({
          message: "Something went wrong while adding the expense.",
          type: "error",
        });
        setTimeout(() => {
          setNotification({ message: null, type: null });
        }, 5000);
      });
  };

  const deleteExpense = (id) => {
    expenseservice
      .remove(id)
      .then(() => {
        setExpense(expense.filter((exp) => exp.id !== id));
        setNotification({
          message: "Expense deleted successfully!",
          type: "success",
        });
        setTimeout(() => {
          setNotification({ message: null, type: null });
        }, 5000);
      })
      .catch((error) => {
        setNotification({
          message: "Error deleting expense.",
          type: "error",
        });
        setTimeout(() => {
          setNotification({ message: null, type: null });
        }, 5000);
      });
  };
  const updateExpense = (updatedExpense) => {
    // Call the update service to update the expense in the backend
    expenseservice
      .update(updatedExpense.id, updatedExpense)
      .then((updatedExpense) => {
        // Update the expense in the state
        setExpense(
          expense.map((exp) =>
            exp.id === updatedExpense.id ? updatedExpense : exp
          )
        );
      })
      .catch((error) => {
        console.error("Error updating expense:", error);
      });
  };
  return (
    <>
      <Notification message={notification.message} type={notification.type} />
      <Router>
        <div className="container">
          <header className="header">
            <h1>Expense Tracker</h1>
          </header>
          <nav className="navbar">
            <div className="links-container">
              <Link to="/">Home</Link>
              <Link to="/Add">Add New Expense</Link>
            </div>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <ExpenseList
                  expenselist={expense}
                  onDelete={deleteExpense}
                  showSummary={true}
                  onUpdate={updateExpense}
                />
              }
            />
            <Route
              path="/Add"
              element={<AddExpense createExpense={addExpense} />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
