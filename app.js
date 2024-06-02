// Connects the whole app
const configuration = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const transactionRouter = require("./controllers/Transactions");

require("express-async-errors");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");



const mongoose = require("mongoose").set("strictQuery", true);
//Connecting with mongoDB based on configuration specified in .env file
mongoose.connect(configuration.MONGODB_URI)
    .then(() => {
        logger.info("Mongo Connection Success!");
    }).catch((error) => {
        logger.error("error connecting to MongoDB:", error.message);
    });

app.use(cors());
app.use(express.json());
app.use("/api/transactions", middleware.requestLogger, transactionRouter);
app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;