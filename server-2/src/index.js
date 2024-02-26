const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser')

const mu_place = require('../routers/mu_places')
const nearby = require('../routers/nearby_places')
const img = require('../routers/images')
const usr = require('../routers/users')
const guide = require('../routers/guide');
const {upload_img} = require('../routers/uploadimages')
const latlong = require('../routers/latlong');
const verify_guide = require('../routers/verifyGuide')
const Guide_detail = require('../routers/Guides_detail');
const app = express();


app.use(cors())
app.use(bodyparser.json())



mongoose.connect(process.env.CON_STR)
.then(() => console.log('db connected'))
.catch(err => console.log(err))

//muplace
app.use('/muplace', mu_place);

//nearbyplace
app.use('/nearby', nearby);

//img for everythin
app.use('/image', img);

//register login
app.use('/user', usr);

//guide
app.use('/guide', guide);

//upload_img
app.use('/upload-img', upload_img);

//llatlong
app.use('/latlong', latlong);

//verify_guide
app.use('/verify_guide', verify_guide)


//Guide_detail
app.use('/guide_detail', Guide_detail)






app.get('/',(req,res) => {
    res.send('ok')
})


app.listen(process.env.PORT,() => {
     console.log(`server ok on ${process.env.PORT}`);
})

