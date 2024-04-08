const Shop = require('express').Router();
const db_shop = require('../model/Shop-Model');
const multer = require('multer');
const {create_dir} =require('../routers/uploadimages')
const path = require('path')
const usr = require('../model/User-model') 
const fs = require('fs');


Shop.get('/',(req,res) => {
    return res.send('ok shop')
})



//add_profile_image_shop
const add_profile_image_shop = multer.diskStorage({
    destination:async(req,file,cb)=>{

          let dir =  await create_dir(req.params.shop_id,"shop","profile_img");
          cb(null,dir)
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + req.params.shop_id+file.originalname);
    }
})

const upload_shop_profile = multer({storage:add_profile_image_shop})


Shop.post('/add_profile_img_shop/:shop_id',upload_shop_profile.single('shop-profile'), async (req,res) => {
    try{
        let Add_profile_img = await db_shop.findByIdAndUpdate(
            {_id:req.params.shop_id},
            {profile_shop_pic:req.file.filename}
        )

        return res.send({status:'ok',Add_profile_img});
    }
    catch(err){
        return res.send({status:'error',err})
    }
 
})

Shop.post('/create-shop', async (req,res) => {
    const {
        id_user,
        shop_name,
        shop_detail,
        contact

    } = req.body;

   
    console.log(contact);

    try{

        let check_user = await usr.findOne({_id:id_user});
        let check_shop = await db_shop.findOne({id_user:id_user});

        if(!check_user && check_shop)
        {
            return res.send('something went wrong');
        }

           await usr.findByIdAndUpdate(
            {_id:id_user},
            {shop:true}
            )

           let newcontact = {
                ...contact,
                email:check_user.email
          }

          

        let create_shop = await db_shop.create({
            id_user:id_user,
            shop_name:shop_name,
            shop_detail:shop_detail,
            
            contact:newcontact
        })

        

        return res.json({status:"success",create_shop});

    }
    catch(err){
        return res.send({status:'error',err})
    }
})






//frist
//add_shop_item_image
const add_item_img = multer.diskStorage({
    destination: async (req,file,cb)=>{
        let dir = await create_dir(req.params.shop_id,"shop","post_img");
        cb(null,dir);
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+ req.params.shop_id + file.originalname)
    }
})

const upload_img_post = multer({storage:add_item_img})



Shop.post('/add_post_img/:shop_id/',upload_img_post.array('upload_post',5),(req,res) => {

        const fileNAME = req.files.map((e) => e.filename);
        return res.send({status:'sucess', 
                         filename:fileNAME,
                         shop_id:req.params.shop_id,
                        });
})



//get image post shop
Shop.get('/post_img/:shop_id/:image_name', async (req,res) => {
     const shop_id = req.params.shop_id;
     const image_name = req.params.image_name;

     try{
          let dir_ = path.dirname(__dirname);
          let imageFile = path.join(dir_,"assets","shop",shop_id,"post_img",image_name)
          res.sendFile(imageFile)

     }
     catch(err){
        return res.send(err)
     }
})


//get image profile shop
Shop.get('/profile_img/:shop_id/:image_name',(req,res) => {
    const shop_id = req.params.shop_id;
    const image_name = req.params.image_name;
  
    try{
        let dir_ = path.dirname(__dirname);
        let imageFile = path.join(dir_,"assets","shop",shop_id,"profile_img",image_name)
        console.log(imageFile);
        res.sendFile(imageFile)

   }
   catch(err){
      return res.send(err)
   }
})








//get all item of shop
Shop.get('/shop_item',async (req,res) => {

    try{
        let data = await db_shop.find({}).select('shop_items id_user');
        return res.json(data);
    }
    catch(err){
        return res.send(err)
    }
})


//createshop




//second
//add-item shop
Shop.put('/add-item/:shop_id', async (req,res) => {
         
         const {shop_item,filename} = req.body
         console.log(req.body);
        try{
            
            let postdata = {
                 ...shop_item,
                 item_photo:filename,
            }

            
            let add_item = await db_shop.findByIdAndUpdate(
                {_id:req.params.shop_id},
                {
                    $push:{shop_items:postdata}
                }
                
                )

            return res.send({status:'ok',add_item})

        }
        catch(err){
            return res.send({status:'error',err})
        }


})

//get per_shop detail
Shop.get('/get_per_shop/:shop_id/:shop_item_id', async(req,res) => {

    try{
        const {shop_id,shop_item_id} = req.params;

        let per_shop = await db_shop.findOne({
            _id:shop_id,
            shop_items:{
                $elemMatch:{_id:shop_item_id}
            }
        });
        if(!per_shop){
            return res.send('no found');
        }
        return res.json(per_shop);
        
    }
    catch(err)
    {
        return res.send(err);
    }
})




//upload shop profile
const edit_shop_img = multer.diskStorage({
     destination:async(req,file,cb)=>{
        try{
          let dir = await create_dir(req.params.id_user,"shop","profile_img");
          cb(null,dir);
        }
        catch(err)
        {
            console.log(err);
            return;
        }
     },
     filename:(req,file,cb) =>{
          cb(null,Date.now() + req.params.id_user + file.originalname);  
     }
})



const upload_edit = multer({storage:edit_shop_img})

//from edit
Shop.post('/upload-edit-profile/:id_user', upload_edit.single('profile_img'),
    async (req,res) => {
          return res.json({
            status:'ok',
            id_user:req.params.id_user,
            filename:req.file.filename
          })
     }
)


//from registarf if have
Shop.post('/upload-register-profile/:id_user',upload_edit.single('profile_pic'),
 async   (req,res) => {

      try{ 
            console.log(req.file.originalname);
            let filter = {_id:req.params.id_user}
            let data = {
                    profile_shop_pic:req.file.filename
            }
            let regispic = await db_shop.findByIdAndUpdate(filter,data);

            return res.json({status:'ok',regispic});
      }
      catch(err){
          return res.send(err)
      }
}) 



//edit shop
Shop.put('/edit-profile/:usrid',async (req,res) => {
      const {shop_name,detail,opening,tel,address,email} = req.body.editShop;
      const {filename} = req.body;
      const {usrid} = req.params

     
      try{
            let og = await db_shop.findOne({id_user:usrid});
            let filter = {id_user:usrid}
            console.log(req.body.editShop);
            let updated_data = {
                
                shop_name:shop_name || og.shop_name,
                shop_detail:{
                    detail:detail || og.shop_detail.detail,
                    opening:opening || og.shop_detail.opening
                },
                contact:{
                    tel:tel || og.contact.tel,
                    address:address || og.contact.address,
                    email:email || og.contact.email
                },
                profile_shop_pic:filename || og.profile_shop_pic
            }

            console.log(og.contact.email);

            let updating = await db_shop.findOneAndUpdate(filter,updated_data);

            return res.json(updating)

      }
      catch(err)
      {
        return res.send(err)
      }

    
} )



Shop.get('/:userID',async(req,res) => {

    try{
        let id = await db_shop.findOne({id_user:req.params.userID}).select('_id');
        return res.json(id);
    }
    catch(err){
        return res.send({status:"error",err})
    }
})


//delete product
Shop.delete('/delete/:shop_id/:shop_item_id',async (req,res) => {


     try{
     
            let filter = {_id:req.params.shop_id};
            let remove = {$pull:{shop_items:{_id:req.params.shop_item_id}}};

       
            let result = await db_shop.updateOne(filter,remove);
            
            if (result.modifiedCount === 0) {
                return res.status(404).send({ message: "No item found with that ID in the shop." });
            }
            return res.send({ status:'ok',msg:'deleted' });
     }  
     catch(err){  
          return res.json(err)
     }
})

//addphotoreview shop
const shopReviewImg = multer.diskStorage({
      destination:async(req,file,cb)=>{
          let dir =  await create_dir(req.params.shop_id,"shop","reviewImage");
          cb(null,dir);
      },
      filename:(req,file,cb)=>{
          cb(null,Date.now() + req.params.shop_id+file.originalname);
      }
})

const UploadReview = multer({storage:shopReviewImg})

Shop.post('/review/image/:shop_id', UploadReview.array('reviewImage', 5),
       async (req,res) =>{
        if(req.files.length > 0){
              return res.json({
                status:'ok',
                shop_id:req.params.shop_id,
                photos:req.files.map((image => image.filename))
              })
        }
})

//addreview shop
Shop.post('/review/:id_user/:item_id', async (req,res) => {
    const {id_user,item_id} = req.params;

    try{

         let newupdate = {
              review_username:req.body.review.username,
              review_score:req.body.review.score,
              review_detail:req.body.review.detail,
              review_image:req.body.imagedata
         }
         let data = await db_shop.updateOne(
               {
                  _id:id_user,
                  "shop_items._id":item_id
               },
               {
                 $push:{'shop_items.$.item_review':newupdate}
               },              
         ) 

        console.log(data);
         return res.json(data)
    }
    catch(err){
        console.log(err);
        return;
    }
})

//getimage
Shop.get('/review/img/:id_shop/:img_name',async (req,res) => {
    const {id_shop,img_name} = req.params;
     let dir = path.dirname(__dirname);
     let filename = path.join(dir,"assets","shop",id_shop,"reviewImage",img_name);

     if(!fs.existsSync(filename)){
        return res.send('no image found from review img shop')
    }  

    return res.sendFile(filename);
})


//delete review shop
Shop.delete('/delete/review/:id_shop/:id_post/:id_review',
    async (req,res) => {
         try{
            const {id_post,id_shop,id_review} = req.params;
            let filter = {
                _id:id_shop,
                "shop_items._id":id_post
           };
           let datatoremove = {
            $pull:{
                 'shop_items.$.item_review':{_id:id_review}
            }
       }
       let deletereview = await db_shop.updateOne(filter,datatoremove)
       console.log(deletereview);
       return res.json(deletereview)
            
         }
         catch(err){
            return res.send(err);
         }
    }

)


//get shop review
Shop.get('/review/:id_shop/:shop_item_id',async(req,res) => {
    try{
       const {id_shop,shop_item_id} = req.params;
       let filter = {
        _id:id_shop,
        "shop_items._id":shop_item_id
   };
   let data = await db_shop.findOne(filter).select('shop_items.$');
 
   return res.json(data.shop_items[0].item_review)
   
    }
    catch(err){
        return res.send(err)
    }
})


//add reply
Shop.post('/reply/review/:id_shop/:shop_item_id/:id_review/:replyID',async (req,res) =>{
    console.log(req.params);
    try{
        
        let filter = {
            "_id":req.params.id_shop,
            "shop_items._id":req.params.shop_item_id,
            "shop_items.item_review._id":req.params.id_review
        }
        let update = {
            $set:{
                "shop_items.$[elem].item_review.$[reviewElem].review_reply":{
                    replied:true,
                    detail:req.body.replyText
                }
            }
        }

        let options = {
            arrayFilters: [
                { "elem._id": req.params.shop_item_id }, 
                { "reviewElem._id": req.params.id_review } 
            ]
        }

        let update1 = await db_shop.findOneAndUpdate(filter,update,options);
        console.log(update1);
        return res.json(update1);
    }
    catch(err){
        console.error(err);
        return res.status(500).send({ error: "Failed to update review" });
    }

})


Shop.put('/like/review/:id_shop/:shop_item_id/:id_review/:usr_name/:isreview', async (req, res) => {
    const { id_shop, shop_item_id, id_review, usr_name, isreview } = req.params;
  
    try {
      let filter = {
        "_id": id_shop,
        "shop_items._id": shop_item_id,
        "shop_items.item_review._id": id_review
      };
  
      let queryyyyy;
  
      let update = {
        $inc: { 'shop_items.$.item_review.$[review].review_like.countlike': 1 },
        $push: { 'shop_items.$.item_review.$[review].review_like.countUser': usr_name }
      };
  
      let delete1 = {
        $inc: { 'shop_items.$.item_review.$[review].review_like.countlike': -1 },
        $pull: { 'shop_items.$.item_review.$[review].review_like.countUser': usr_name }
      };
  
      let options = {
        arrayFilters: [{ 'review._id': id_review }],
        new: true
      };
  
      if (isreview === 'true') {
        queryyyyy = delete1;
      } else {
        queryyyyy = update;
      }
  
      let updated = await db_shop.findOneAndUpdate(filter, queryyyyy, options);
      return res.send({ status: 'ok', updated });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  });
  



module.exports = Shop;