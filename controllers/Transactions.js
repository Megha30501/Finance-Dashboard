const transactionRouter = require("express").Router();
const Transaction = require("../models/Transactions");
const express = require("express");
const app = express();
app.use(express.json());

// Retrieve all transactions
transactionRouter.get("/", async (req, res) => {
    const transactions = await Transaction.find({});
    return res.json(transactions);
});

// GET ANY TRANSACTION WITH ID
transactionRouter.get('/:id', async (req, res) => {
    try {
        // Find the requested transaction from the database (mongoDB)
        const transactions = await Transaction.findById(req.params.id);
        if (!transactions) {
            return res.status(404).send('Transaction not found');
        }
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).send('Server error');
    }
});


// Add a new transaction.
transactionRouter.post('/', async (req, res) => {
    const { type, amount, category, date, description } = req.body;
    const transaction = new Transaction({
        type,
        amount,
        category,
        date,
        description
    });
    try {
        // Save the new transaction to the database (mongoDB)
        const savedTransaction  = await transaction.save();
        res.status(201).json(savedTransaction );
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: 'Invalid Input data' });
        } else {
            res.status(500).send({ error: 'Something went wrong while saving the transaction: ' + error.message });
        }
    }
});

// Update an existing transaction.

transactionRouter.put('/:id', async (req, res) => {
    const{ type, amount, category, date, description }  = req.body;

    try {
        // Update the existing book in the database (mongoDB)
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            { type, amount, category, date, description } ,
            { new: true, runValidators: true }
        );
        // Return error if book id is incorrect
        if (!updatedTransaction) {
            return res.status(404).send('Transaction not found');
        }

        res.status(200).json(updatedTransaction);
    } catch (error) {
        res.status(400).send('Error: Something went wrong while updating the transaction: ' + error.message);
    }
});

// Delete a transaction.
transactionRouter.delete('/:id', async (req, res) => {
    try {

        // Delete the existing transaction from the database (mongoDB)
        const deletedTransaction  = await Transaction.findByIdAndDelete(req.params.id);

        // Return error if transaction id is incorrect
        if (!deletedTransaction ) {
            return res.status(404).send('Transaction not found');
        }
        res.status(200).send(`Transaction id ${deletedTransaction._id} is deleted successfully`);
    } catch (error) {
        res.status(500).send('Error: Something went wrong while deleting the transaction:' + error.message);
    }
});

module.exports = transactionRouter;