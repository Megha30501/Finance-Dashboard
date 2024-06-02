import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import expenseservice from "./services/expense";
import AddExpense from "./components/AddExpenseForm";
import Notification from "./components/Notification";
import ExpenseList from "./components/ExepenseList";

import './app.css'

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
        <div className="vertical-navbar">
        <nav className="navbar">
            <div className="links-container">
            <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Add">Add New Expense</Link></li>
        </ul>
            </div>
          </nav>
        </div>
        <div className="container">
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
