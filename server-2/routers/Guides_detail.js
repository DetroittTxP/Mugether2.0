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

Guide_detail.post('/create_post/:id',async(req,res) => {

     const { id } = req.params;
     const {post} = req.body;
     try{

        
   
          let push_post = await db.findOneAndUpdate(
               {
                    _id:id
               },
               {
                    $push:{guide_post:post}
               }
          )

          return res.send(push_post)
     }
     catch(err){
          
       return res.send({status:'error',err})
     }

})


module.exports = Guide_detail;