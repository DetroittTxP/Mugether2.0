const express = require('express');
require('dotenv').config();
const Muplace = require('./routers/Mu_place')
const Shop = require('./routers/Shop')
const cors = require('cors')
const app = express();


app.use(cors())
app.use('/muplace', Muplace )
app.use('/shop', Shop )



app.listen(process.env.PORT,() => {
    console.log('server run on ' + process.env.PORT);
})




