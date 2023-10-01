const router = require('express').Router();
const {MongoClient} = require('mongodb')
require('dotenv').config({path:'../.env'})


const client = new MongoClient(process.env.CONNECT_STRING_BANK)

router.get('/mudata',async (req,res) => {
     
       await client.connect();
       let result = await client.db(process.env.DATABASE).collection(process.env.MU_PLACE)
       
})


router.get('/',(req,res) => {
       res.send('MU PLACE OK')
})






module.exports = router;