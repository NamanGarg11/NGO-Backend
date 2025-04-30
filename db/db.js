const moongoose = require('mongoose');
const dotenv = require('dotenv').config();
const db = process.env.DB_URL;
function connectDB(){
    moongoose.connect(db, {
      
    })
    .then(() => {
        console.log('Database connected successfully');
    }
    )
    .catch((error) => {
        console.error('Database connection error:', error);
    }
    );
}
module.exports = connectDB;
