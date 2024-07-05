const express = require('express');
const { connectMongoDb } = require('./connection.js');

const userRouter = require("./routes/user")
const  logReqRes  = require("./middlewares");


const app = express();
const PORT = 8000;


//Connection
connectMongoDb("mongodb://127.0.0.1:27017/yt-node-app")
.then(() => console.log("Mongodb connected"))


//middle ware
app.use(express.urlencoded({ extended: true }));
app.use(logReqRes("log.txt"));


//routes
app.use("/api/users", userRouter);


app.listen(PORT, () => console.log("Server Started at port 8000"));