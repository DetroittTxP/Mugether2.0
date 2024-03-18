 const mongoose = require('mongoose');


const shop_model = mongoose.Schema({
    id_user:{type:String,required:true},
    shop_name:{type:String,required:true},
    shop_detail:{
        type:{
            detail:String,
            opening:String,
        },
    },
    shop_items:{
        type:[{
            
            item_photo:[],
            item_name:String,
            item_detail:String,
            item_price:Number,
            item_review:{
                 type:[{
                    review_username:String,
                    review_score:Number,
                    review_detail:String,
                    review_image:[String]
                 }],
                 default:[],
            }
        }],
        default:[]
    },
    shop_review:{
        type:[{
            review_username:String,
            review_score:Number,
            review_detail:String,
            review_image:[String]
        }],
        default:[]
    },
    contact:{
        type:{
            tel:String,
            address:String,
            lat:Number,
            long:Number,
            Ig_shop:String,
            LineID:String,
            email:String

        }
    },
    profile_shop_pic:{
        type:String,
        default:'profile_temp.png'
    },

})


module.exports = mongoose.model(process.env.DB_SHOP, shop_model);
// const shop_model = mongoose.Schema({
//     id_user:String,
//     name:{type:String,required:true},
//     contact:{
//         type:Object,required:true
//     },
//     tel:String,
//     photo:[String],
//     detail:String,
//     rating:{
//         type:Number,
//         default:null
//     },
//     opening:String,
//     address:String,
//     lat:Number,
//     long:Number,
//     review:[],
//     items:[],
//     profile_pic:String

// })

