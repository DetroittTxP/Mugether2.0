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
   {
    "shopdata":{
        "name":"KEN",
        "contact":{
            "owner_name":"test-ownwer",
            "tel":"087-111-1111",
            "email":"ken@email.com"
        },
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





shop.put('/addreview', async (req,res) => {
        
       const {shopname,username,comment} = req.body;

       try{
           await client.connect();
           let result = await client.db(process.env.DATABASE)
                        .collection(process.env.SHOP)
                        .updateOne(
                            {name:shopname},
                            {
                                   $push:{
                                          review:{
                                                 user:username,
                                                 comment:comment
                                          }
                                   }
                            }
                        )

           return res.send(result)             
       }
       catch(err){
             return console.log(err);
       }
       


})


shop.get('/test',(req,res) => {
       res.send('SHOP OK')
})



module.exports = shop;