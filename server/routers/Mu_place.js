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

mu.post('/addmuplace', async (req,res) => {
       
       const {mudata} = req.body;
       let result = await client.db(process.env.DATABASE)
                    .collection(process.env.MU_PLACE)
                    .insertOne(mudata)

         return res.send(result)
       

})

mu.get('/mudata/:name',async (req,res) => {
     
       await client.connect();
       let result = await client.db(process.env.DATABASE)
                   .collection(process.env.MU_PLACE)
                   .find({name:req.params.name})
                   .toArray();

       return res.json(result);
       
})



mu.post('/addreviewmuplace/',async (req,res) => {
       const {reviewdetail,muplacename} = req.body;

       let resultreview = await client.db(process.env.DATABASE)
       .collection(process.env.MU_PLACE)
       .updateOne(
              {name:muplacename},
              {
                     $push:{review:reviewdetail}
              }
       )
       res.json(resultreview)
})




mu.get('/nearby/travel/:muplace_name',async (req,res) => {

       const {muplace_name} = req.params;

       let result = await client.db(process.env.DATABASE)
                    .collection(process.env.TRAVEL)
                    .find({mu_place:{$regex:muplace_name}},{projection:{"photo_path":0}})
                    .toArray()
       await client.close();
       
       res.json(result)
        
})

mu.get('/nearby/food/:muplace_name',async (req,res) => {

       const {muplace_name} = req.params;

       let result = await client.db(process.env.DATABASE)
                    .collection(process.env.FOOD)
                    .find({mu_place:{$regex:muplace_name}},{projection:{"photo_path":0}})
                    .toArray()
       await client.close();
       
       res.json(result)
                    
        
})

mu.get('/nearby/hotel/:muplace_name',async (req,res) => {

       const {muplace_name} = req.params;

      let result = await client.db(process.env.DATABASE)
                    .collection(process.env.HOTEL)
                    .find({mu_place:{$regex:muplace_name}},{projection:{"photo_path":0}})
                    .toArray()
       await client.close();
       
       res.json(result)
       
  
        
})


mu.get('/nearby/multiple/:muplace_name',async (req,res) => {

       const {muplace_name} = req.params;
       console.log(muplace_name);
       let resultHOTEL = await client.db(process.env.DATABASE)
                    .collection(process.env.HOTEL)
                    .find({
                       $or:[
                            {mu_place:{$regex:muplace_name}},{projection:{"photo_path":0}},
                            {mu_place:muplace_name}
                       ]    
                    })
                    .toArray()
     

       let resultFOOD = await client.db(process.env.DATABASE)
                    .collection(process.env.FOOD)
                    .find({
                     $or:[
                          {mu_place:{$regex:muplace_name}},
                          {projection:{"photo_path":0}},
                          {mu_place:muplace_name}
                     ]
                  })
                    .toArray()


       let resultTRAVEL = await client.db(process.env.DATABASE)
                    .collection(process.env.TRAVEL)
                    .find({
                     $or:[
                          {mu_place:{$regex:muplace_name}},{projection:{"photo_path":0}},
                          {mu_place:muplace_name}
                     ]
                  })
                    .toArray()
    

      return res.json({
              status:'ok',
              travel:resultTRAVEL,
              food:resultFOOD,
              hotel:resultHOTEL
       })


})









mu.get('/',(req,res) => {
       res.send('MU PLACE OK')
})



module.exports = mu;