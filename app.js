require('dotenv').config();
require('express-async-errors');

// express
const express = require('express');
const app = express();

// rest of the package
const morgan = require('morgan');
const cookieParser = require("cookie-parser");

// databaseconst 
const connectDB = require('./db/connect')

// routers
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')

// app usage
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.JWT_SECRET));


app.use("/api/v1/auth", authRouter)
app.use('/api/v1/users', userRouter)

const port = process.env.PORT || 3000
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start();