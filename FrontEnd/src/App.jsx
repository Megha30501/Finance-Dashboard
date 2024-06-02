import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import expenseservice from "./services/expense";
import AddExpense from "./components/AddExpenseForm";
import Notification from "./components/Notification";
import "./app.css";

const ExpenseList = ({ expenselist }) => {
  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {expenselist.map((exp) => (
          <li key={exp.id}>{exp.description}: ${exp.amount}</li>
        ))}
      </ul>
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
    expenseservice.getAll()
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

  const padding = {
    margin: '5px',
    padding: '30px 5px 10px 30px',
    borderRadius: '5px',
    transition: 'background-color 0.2s ease-in-out',
    color: '#333',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  return (
    <>
      <Notification message={notification.message} type={notification.type} />
      <Router>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Link style={padding} to="/">
              Home
            </Link>
            <Link style={padding} to="/Add">
              Add New Expense
            </Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<ExpenseList expenselist={expense} />} />
          <Route path="/Add" element={<AddExpense createExpense={addExpense} />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
