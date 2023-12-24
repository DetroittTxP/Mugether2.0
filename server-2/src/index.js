const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser')

const mu_place = require('../routers/mu_places')
const nearby = require('../routers/nearby_places')
const img = require('../routers/images')
const app = express();



app.use(cors())
app.use(bodyparser.json())

mongoose.connect(process.env.CON_STR)
.then(() => console.log('db connected'))
.catch(err => console.log(err))

//muplace
app.use('/muplace', mu_place)

//nearbyplace
app.use('/nearby', nearby)

//img for everythin
app.use('/image', img)

//register
//login

app.get('/',(req,res) => {
    res.send('ok')
})


app.listen(process.env.PORT,() => {
     console.log(`server ok on ${process.env.PORT}`);
})

