const Shop = require('express').Router();
const db_shop = require('../model/Shop-Model');
const multer = require('multer');
const {create_dir} =require('../routers/uploadimages')


Shop.get('/',(req,res) => {
    return res.send('ok shop')
})



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


Shop.post('/add_post_img/:shop_id/',upload_img_post.single('upload_post'),(req,res) => {


        return res.send({status:'sucess', 
                         filename:req.file.filename,
                         shop_id:req.params.shop_id,
                        });
})







Shop.post('/create-shop', async (req,res) => {
    const {
        id_user,
        shop_name,
        shop_detail,
        contact

    } = req.body;

    try{

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



module.exports = Shop;