const mongoose = require('mongoose');

const shop_model = mongoose.Schema({
    name:{type:String,required:true},
    contact:{
        type:Object,required:true
    },
    tel:String,
    photo:[String],
    detail:String,
    rating:{
        type:Number,
        default:null
    },
    opening:String,
    address:String,
    lat:Number,
    long:Number,
    review:[],
    profile_pic:String

})

module.exports = mongoose.Schema(process.env.DB_SHOP, shop_model);