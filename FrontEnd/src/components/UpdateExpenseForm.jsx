// UpdateExpenseForm.jsx

import { useState } from 'react';

const UpdateExpenseForm = ({ expense, onUpdate }) => {
  const [updatedExpense, setUpdatedExpense] = useState({ ...expense });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedExpense({ ...updatedExpense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedExpense);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="amount" value={updatedExpense.amount} onChange={handleChange} />
      <input type="text" name="description" value={updatedExpense.description} onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateExpenseForm;
