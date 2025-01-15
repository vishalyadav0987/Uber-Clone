const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./connectDB/connect');

connectDB();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({extended:true}));
app.use(cors());


app.get('/test',(req,res)=>{
    res.send("This routing using for testing purpouse");
})

module.exports = app;

