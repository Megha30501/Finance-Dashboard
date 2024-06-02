import { useState } from 'react';
import '../css/addexpenseform.css'

const AddExpenseForm = ({ createExpense }) => {
    const [activeTab, setActiveTab] = useState('Expense');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    

    const expenseCategories = ['Household', 'Food', 'Transportation', 'Social Life', 'Health', 'Education', 'Beauty', 'Other'];
    const incomeCategories = ['Salary', 'Bonus', 'Tips', 'Other'];

    const addExpense = (event) => {
        event.preventDefault();
        createExpense({
            type: activeTab, // Set type based on active tab
            amount: amount,
            category: category,
            date: date,
            description: description,
        });
        setAmount('');
        setCategory('');
        setDate('');
        setDescription('');
    };

    const categories = activeTab === 'Expense' ? expenseCategories : incomeCategories;

    return (
        <div className="formDiv">
            <h2>Add New Transaction</h2>
            <div className="tabs">
  <button
    className={`button ${activeTab === 'Expense' ? 'active' : ''}`}
    onClick={() => setActiveTab('Expense')}
  >
    Expense
  </button>
  <button
    className={`button ${activeTab === 'Income' ? 'active' : ''}`}
    onClick={() => setActiveTab('Income')}
  >
    Income
  </button>
</div>
            <form onSubmit={addExpense}>
                <div className="input-group">
    <label htmlFor="amount">Amount</label>
                    <input
                        type="numbers"
                        required = "true"
                        value={"$" + amount} // Include "$" sign in the input field value
                        onChange={(e) => setAmount(e.target.value.replace('$', ''))}
                    />
                </div>
                <div className="input-group">
    <label htmlFor="category">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="input-group">
    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="input-group">
    <label htmlFor="description">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="input-group">
                    <button id="submit-button" type="submit">Add Transaction</button>
                </div>
            </form>
        </div>
    );
};

export default AddExpenseForm;
