const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./connectDB/connect');
const userRoutes = require('./routes/userRouter');

connectDB();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({extended:true}));
app.use(cors());


app.get('/test',(req,res)=>{
    res.send("This routing using for testing purpouse");
});
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/users',userRoutes);

module.exports = app;

