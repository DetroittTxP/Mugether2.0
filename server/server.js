const express = require('express');
const {MongoClient} = require('mongodb')
require('dotenv').config();
const Muplace = require('./routers/Mu_place')
const Shop = require('./routers/Shop')
const app = express();


app.use('/muplace', Muplace )
app.use('/shop', Shop )






app.listen(process.env.PORT,() => {
    console.log('server run on ' + process.env.PORT);
})




