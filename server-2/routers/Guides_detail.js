const Guide_detail = require('express').Router();
const Guide_detail_Model = require('../model/Guide_detail-Model');
const user = require('../model/User-model')
const db = Guide_detail_Model;



Guide_detail.get('/',(req,res) => {
     res.send('ok')
})



Guide_detail.post('/create_guide', async (req,res)=>{
     const {_id,firstname,lastname,mu_location,} = req.body;

     try{
          let check_id = await user.findOne({_id:_id});
          let check_guide = await db.findOne({id_guide:_id});
       
          if(!check_id || check_guide){
               return res.send({status:'error',msg:'duplicate guide or not user found'});
          }


          let create_guide = await db.create({
               id_guide:_id,
               firstname:firstname,
               lastname:lastname,
               mu_location:mu_location
          })
  
          return res.json({status:'success',result:create_guide});
     }
     catch(err){
          return res.send({status:'error',Error:err})
     }
})

Guide_detail.post('/create_post/:usr_id',async(req,res) => {

     const { usr_id } = req.params;
     const {post,photos} = req.body;
     
     const newpost = {
          ...post,
          postPhotos:photos
     }
     console.log(newpost);

     try{

        
   
          let push_post = await db.findOneAndUpdate(
               {
                    id_guide:usr_id
               },
               {
                    $push:{guide_post:newpost}
               }
          )

          return res.send(push_post)
     }
     catch(err){
          
       return res.send({status:'error',err})
     }

})

//get guide detail
Guide_detail.get('/get_list_guide/:muplace',(req,res) => {
     const {muplace} = req.params;

     try{

     }
     catch(err){
          
     }
})


module.exports = Guide_detail;