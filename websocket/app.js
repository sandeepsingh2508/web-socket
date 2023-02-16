const express=require('express')
const app=express()
const errorMiddleware=require('./middlewares/error')
const inventoryData=require('./routes/CrudRoute')
const cors = require('cors');
app.use(cors());

app.use('/api/v1',inventoryData);
app.use(errorMiddleware)

module.exports=app