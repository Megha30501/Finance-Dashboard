import { useState } from 'react'
import expenseservice from './services/expense'
import AddExpense from './components/AddExpenseForm'
import './app.css'

function App() {
  const[Expense,setExpense] = useState([])
  const addExpense = (expenseObject) => {
    expenseservice
      .create(expenseObject)
      .then(returnedExpense => {
        setExpense(Expense.concat(returnedExpense));
      });
  }

  return (
    <>
     <AddExpense createExpense={addExpense} />
    </>
  )
}

export default App
