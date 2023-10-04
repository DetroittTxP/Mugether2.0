const images = require('express').Router();
const fs = require('fs');
const path = require('path')

images.get('/',(req,res) => {
      res.send('images ok')
})

let countApi = 0;
images.get('/mu/:name/:id',(req,res) => {
    
   let dir = path.dirname(__dirname)
    let imagesFile = path.join(dir,"photofile","MuPlace",req.params.name,`${req.params.name}${req.params.id}.jpg`);

     countApi++;
     console.log(countApi, '');
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

module.exports = images;