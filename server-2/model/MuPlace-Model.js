const mongoose = require('mongoose');

const Muplace_Schema = mongoose.Schema({
    place_id:String,
    name:{type:String,required:true},
    place_detail:String,
    howto_mu:[],
    address:{type:String,required:true},
    rating:Number,
    type:String,
    lat:Number,
    long:Number,
    review:[],
    video_url:{
        type:String,
        default:''
    }
})


module.exports = mongoose.model(process.env.DB_MU_PLACE, Muplace_Schema)