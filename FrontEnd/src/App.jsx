import { useState } from 'react'
import expenseservice from './services/expense'
import AddExpense from './components/AddExpenseForm'
import Notification from './components/Notification'
import './app.css'

const App = () => {
  const[Expense,setExpense] = useState([])
  const [notification, setNotification] = useState({ message: null, type: null });
 
  const addExpense = (expenseObject) => {
    expenseservice
      .create(expenseObject)
      .then(returnedExpense => {
        setExpense(Expense.concat(returnedExpense));
        setNotification(`A New Expense has been added successfully!`);
        setTimeout(() => {
          setNotification(null);
      }, 5000);
      })
      .catch(error => {
        setNotification({ message: 'Something went wrong while adding the expense.', type: 'error' });
        setTimeout(() => {
            setNotification({ message: null, type: null });
        }, 5000);
    });
  }

  return (
    <>
      <Notification message={notification.message} type={notification.type} />
     <AddExpense createExpense={addExpense} />
    </>
  )
}

export default App
