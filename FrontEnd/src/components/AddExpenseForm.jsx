import { useState } from 'react';


const AddExpenseForm  = ({ createExpense }) => {
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const categories = ['Household', 'Food', 'Transportation', 'Social', 'Beauty'];

    const addExpense = (event) => {
        event.preventDefault();
        createExpense({
            type: type,
            amount: amount,
            category: category,
            date: date,
            description: description,
        });
        setType('');
        setAmount('');
        setCategory('');
        setDate('');
        setDescription('');
    };

    return(
        <div className="formDiv">
            <h2>Add New Transaction</h2>
            <form onSubmit={addExpense}>
            <div>
                    <label>Type</label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="">Select type</option>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>
                <div>
                    <label>Amount</label>
                    <input
                        type="text"
                        value={"$" + amount} // Include "$" sign in the input field value
                        onChange={(e) => setAmount(e.target.value.replace('$', ''))}
                    />
                </div>
                <div>
                    <label>Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <button id="submit-button" type="submit">Add Transaction</button>
                </div>
            </form>
        </div>
    );
};
export default AddExpenseForm;