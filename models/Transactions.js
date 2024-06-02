const mongoose = require("mongoose");
const transSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Income', 'Expense'],
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: true
      },
      description: {
        type: String,
        required: true
      }
});

transSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model("Transaction", transSchema);