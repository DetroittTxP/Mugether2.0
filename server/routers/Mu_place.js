const mu = require('express').Router();
const {MongoClient} = require('mongodb')
require('dotenv').config({path:'../.env'})


const client = new MongoClient(process.env.CONNECT_STRING_BANK)


mu.get('/mudata',async (req,res) => {
     
       await client.connect();
       let result = await client.db(process.env.DATABASE)
                   .collection(process.env.MU_PLACE)
                   .find({},{projection:{"photos":0}})
                   .toArray();

       return res.json(result);
       
})

mu.post('/addmuplace',(req,res) => {
       
})

mu.put('/addreviewmuplace',(req,res) => {
        
})



mu.get('/',(req,res) => {
       res.send('MU PLACE OK')
})



module.exports = mu;