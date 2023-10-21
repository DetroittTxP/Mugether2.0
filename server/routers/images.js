const images = require('express').Router();
const fs = require('fs');
const path = require('path')
const multer = require('multer');
const {MongoClient} = require('mongodb')
require('dotenv').config({path:'../.env'})


images.get('/',(req,res) => {
      res.send('images ok')
})

images.get('/mu/:name/:id',(req,res) => {
    
      let dir = path.dirname(__dirname)
      let imagesFile = path.join(dir,"photofile","MuPlace",req.params.name,`${req.params.name}${req.params.id}.jpg`);
  
      if(!fs.existsSync(imagesFile)){
      return res.send('no images found')
      }
      return res.sendFile(imagesFile)
})



images.get('/nearby/:type/:name/:id',(req,res) => {
      const {id,type,name} = req.params;
      
      let dir = path.dirname(__dirname)
      let imagesFile = path.join(dir,"photofile","Nearby",type,name,`${name}${id}.jpg`)
      
      if(!fs.existsSync(imagesFile)){
          return res.send('no NEARBY images found')
       } 
      return res.sendFile(imagesFile)
})


const client = new MongoClient(process.env.CONNECT_STRING_POND)

images.get('/user/profile/:username', async (req,res) => {
       const {username} = req.params;

       try{
            await client.connect();
            let UserResult = await client.db(process.env.DATABASE)
                                   .collection(process.env.USER)
                                   .findOne({username:username})


            //get image
            let dir = path.dirname(__dirname)
            let imagesFile = path.join(dir,"photofile","User",username,"profile",UserResult.profile_pic_name)        
            console.log(imagesFile);
            
            if(!fs.existsSync(imagesFile)){
                  return res.send({status:"no image hehe"})
            }
            
            res.sendFile(imagesFile)
       }
       catch(err){
            return res.send(err)
       }
})





module.exports = images;
