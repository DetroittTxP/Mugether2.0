const Shop = require('express').Router();
const db_shop = require('../model/Shop-Model');
const multer = require('multer');
const {create_dir} =require('../routers/uploadimages')
const path = require('path')
const usr = require('../model/User-model') 

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
        res.sendFile(imageFile)

   }
   catch(err){
      return res.send(err)
   }
})






//get all item of shop
Shop.get('/shop_item',async (req,res) => {

    try{
        let data = await db_shop.find({}).select('shop_items');
        return res.json(data);
    }
    catch(err){
        return res.send(err)
    }
})


//createshop
Shop.post('/create-shop', async (req,res) => {
    const {
        id_user,
        shop_name,
        shop_detail,
        contact

    } = req.body;

    try{

        let check_user = await usr.findOne({_id:id_user});

        if(!check_user)
        {
            return res.send('something went wrong');
        }

           await usr.findByIdAndUpdate(
            {_id:id_user},
            {shop:true}
            )

        let create_shop = await db_shop.create({
            id_user:id_user,
            shop_name:shop_name,
            shop_detail:shop_detail,
            contact:contact
        })

        return res.json({status:"success",create_shop});

    }
    catch(err){
        return res.send({status:'error',err})
    }
})


//add-item shop
Shop.put('/add-item/:shop_id', async (req,res) => {
     
        const item = req.body;
        const shop_id = req.params.shop_id
        try{
            
            let add_item = await db_shop.findByIdAndUpdate(
                {_id:shop_id},
                {
                    $push:{shop_items:item}
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



module.exports = Shop;