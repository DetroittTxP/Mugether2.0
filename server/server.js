const express = require('express');
const {MongoClient} = require('mongodb')
require('dotenv').config();
const app = express();








app.listen(process.env.PORT,() => {
    console.log('server run on ' + process.env.PORT);
})



