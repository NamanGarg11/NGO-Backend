const express = require('express');
const app = express();
const connectDB = require('./db/db');
connectDB();
const userRouter = require('./Routes/user');
const ngoRouter = require('./Routes/Ngo');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use("/api/user", userRouter);
app.use('/api/ngo',ngoRouter);
module.exports = app;
