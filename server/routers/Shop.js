const shop = require('express').Router();
const {MongoClient} = require('mongodb')
require('dotenv').config({path:'../.env'})


const client = new MongoClient(process.env.CONNECT_STRING_POND)




shop.get('/listofshop', async (req,res) => {

       await client.connect();

       let result = await client.db(process.env.DATABASE)
       .collection(process.env.SHOP)
       .find({})
       .toArray();
      
       return res.send(result)
})





shop.post('/addshop', async(req,res ) => {

       /*
              // shop database format
    {
       "shopdata":{
              "name":"KEN",
              "tel":"123456",
              "contact":[],
              "photo":"",
              "rating":"3",
              "detail":"111/222/333/444/555",
              "opening":"12-16 MONDAY",
              "lat":1,
              "long":2,
              "review":[],
              "profile_pic":""
              }
    }

       */
       
       const {shopdata} = req.body;

       await client.connect();

       let result = await client.db(process.env.DATABASE)
       .collection(process.env.SHOP)
       .insertOne(shopdata)
      

       await client.close()

       return res.send(result)
})







shop.get('/test',(req,res) => {
       res.send('SHOP OK')
})






module.exports = shop;