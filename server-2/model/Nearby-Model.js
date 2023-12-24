const mongoose = require('mongoose');

const models = mongoose.Schema( {
     place_id:String,
     mu_place:{
         type:String,
         required:true
     },
     name:{
        type:String,
        required:true
     },
     rating:Number,
     address:{
        type:String,
        required:true
     },
     lat:{
        type:Number,
        required:true
     },
     lng:{
        type:Number,
        required:true
     },
     distance_to_mu:{
        type:String,
        required:true
     }
})

const Nearby = {
    mu_food:mongoose.model(process.env.DB_FOOD, models),
    mu_travel:mongoose.model(process.env.DB_TRAVEL, models),
    mu_hotel:mongoose.model(process.env.DB_HOTEL, models)
}


module.exports = Nearby;