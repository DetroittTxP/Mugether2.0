const mu_place = require('../model/MuPlace-Model');
const mu = require('express').Router();
const multer  =require('multer');
const fs = require('fs');
const path = require('path')
const {create_dir} = require('./uploadimages')

mu.get('/mudata',async (req,res) => {
  try{
      let result = await mu_place.find({});
      return res.json(result)
  }
  catch(err){
      return res.send(err);
  }
})

mu.get('/mudata/:name',async (req,res) => {
  try{
      let result = await mu_place.find({name:req.params.name});
      return res.json(result)
  }
  catch(err){
      return res.send(err)
}
})


const reviewimgStorage = multer.diskStorage({
       destination:async (req,file,cb) => {
            try{
                const {username} = req.params;
                let dir_name = await create_dir(username,"user","reviewImage");
                cb(null,dir_name);
            }
            catch(err){
                 console.log(err,'hehe');
                 return;
            }
       },
       filename:(req,file,cb)=>{
            try{
                cb(null,Date.now() +  req.params.username + file.originalname)
            }
            catch(err){
                console.log(err,'des ');
                return;
            }
       }
})

const uploadReview = multer({storage:reviewimgStorage})

mu.post('/addreviewmuplace/image/:username',uploadReview.array('reviewImage',5),async(req,res) => {
        console.log(req.files);
        if(req.files && req.params.username)
        {
            return res.json({
                status:'ok',
                username:req.params.username,
                imageName:req.files.map(file => file.filename)
            })
        }

       
})



mu.get('/reviewimage/:username/:imageName',(req,res) => {
       let dir = path.dirname(__dirname);
       let imagesFile = path.join(dir,"assets","user",req.params.username,"reviewImage",req.params.imageName);

       if(fs.existsSync(imagesFile)){
           return res.sendFile(imagesFile);
       }
       else{
          return res.send('no image found')
       }
})

mu.post('/addreviewmuplace/',async (req,res) => {
    const {reviewdetail,muplacename} = req.body.review;
    const image = req.body.image
    
    let newreview =  {
         ...reviewdetail,
         reviewImage:image || null 
    }

    try{
        let result = await mu_place.updateOne(
               {name:muplacename},
               {
                  $push:{review:newreview} 
               }
        )
        res.json(result)

 }
 catch(err){
        return res.send(err)
 }

})



//get latlong for mu and nearby



//delete review
mu.delete('/delete/review/:muplace/:username', async (req,res) => {
     const {muplace,username} = req.params;

     try{   
            let filtermu = {name:muplace};
            let datatoremove = {
                   $pull:{
                      review:{username:username}
                   }
            }
            let deletereview = await mu_place.updateOne(filtermu,datatoremove)
            return res.json(deletereview)
     }
     catch(err){
        return res.send(err)
     }
})

//edit & update review
mu.put('/edit/review/:Muplace_name/:usr_name', async (req, res) => {
    const { Muplace_name, usr_name } = req.params;
    const { detail } = req.body;

    try {
      const result = await mu_place.findOneAndUpdate(
        { name: Muplace_name, "review.username": usr_name },
        { 
          "$set": {
            "review.$.detail": detail 
          }
        },
        { new: true }
      );
      
      if(result) {
        res.json({ success: true, message: 'Review updated successfully.', review: result.review });
      } else {
        res.status(404).json({ success: false, message: 'Review or MuPlace not found.' });
      }
    } catch (error) {
      console.error('Error updating review:', error);
      res.status(500).json({ success: false, message: 'Failed to update review.', error: error.message });
    }
});
  




module.exports = mu;
