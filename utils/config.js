require("dotenv").config();

const PORT = process.env.PORT;


let MONGODB_URI;

if (process.env.NODE_ENV === "dev") {
    MONGODB_URI = process.env.DEV_MONGODB_URI;
} else {
    MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
    MONGODB_URI,
    PORT
};