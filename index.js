const express = require('express');
const app = express();
const connectDB = require('./db/db');
connectDB();
const userRouter = require('./Routes/user');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use("/user", userRouter);
module.exports = app;
