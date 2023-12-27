const mongoose = require('mongoose');

const Muplace_Schema = mongoose.Schema({
    place_id:String,
    name:{type:String,required:true},
    address:{type:String,required:true},
    rating:Number,
    type:String,
    lat:Number,
    long:Number,
    review:[]
})


module.exports = mongoose.model(process.env.DB_MU_PLACE, Muplace_Schema)