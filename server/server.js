const express = require('express');
require('dotenv').config();
const Muplace = require('./routers/Mu_place')
const Shop = require('./routers/Shop')
const cors = require('cors')
const app = express();
const fs = require('fs');
const path = require('path');
const images = require('./routers/images');
const bodyparser = require('body-parser')

app.use(cors())
app.use(bodyparser.json());

app.use('/muplace', Muplace )
app.use('/shop', Shop )
app.use('/image', images)





//manage images
// app.get('/images/Mu/:imagename/:id',(req,res) => {
    
//     if(!req.params.id){
//         req.params.id = 1;
//     }

//     let file = path.join(__dirname,"photofile","Muplace",req.params.imagename,`${req.params.imagename}${req.params.id}.jpg`)
//      console.log(file);
//     if(!fs.existsSync(file)){
//         return res.send('no image')
//     }

//     return res.sendFile(file)
// })








app.listen(process.env.PORT,() => {
    console.log('server run on ' + process.env.PORT);
})





