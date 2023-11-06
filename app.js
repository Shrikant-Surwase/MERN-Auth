const bodyparser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const router = require('./routes/userRoutes')
const app = express()
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(express.json()) //it is bydefault middleware used in express for json data
app.use('/api',router)
mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(5500)
    console.log("database connected success!!")    
})
.catch((err)=>{
    console.log(err)
})
app.listen(5000,(req,res,next)=>{
    console.log("server is listning...")
})

