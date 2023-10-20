const images = require('express').Router();
const fs = require('fs');
const path = require('path')
const multer = require('multer');


const storage = multer.diskStorage({
      destination:(req,file,cb)=>{
            cb(null,'../photofile/User')
      },
      filename:(req, file,cb) => {
             console.log(file);
             cb(null, file.originalname)
      }
})

const upload = multer({storage })



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

images.post('/upload/user', upload.single('image'),(req,res) => {
       res.send({
            status:'ok',
            msg:'user profile saved i sus'
       });
})

module.exports = images;
