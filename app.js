const express = require("express");
const app=express()
const mongoose=require("mongoose")
const morgan=require('morgan')
const cors = require('cors');
require('dotenv/config')
const authJwt=require('./helpers/jwt')
const errorHandler=require('./helpers/error-handler');

app.use(cors());
app.options('*', cors())



//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);


//Routes
const categoriesRoutes = require('./Routers/categories');
const productsRoutes = require('./Routers/products');
const usersRoutes = require('./Routers/users');
const ordersRoutes = require('./Routers/orders');

const api=process.env.API_URL;


app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);
 
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "e-commerce"
})
.then(
    ()=>{
        console.log("database connected")
})
.catch(
    (err)=>{
        console.log(err)
    }
)
app.listen(5000,()=>{
    console.log("server is connected ")
})