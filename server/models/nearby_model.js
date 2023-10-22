const mongoose = require('mongoose')

const Nearbyfield = {
    place_id:String,
    mu_place:String,
    name:String,
    rating:Number,
    address:String,
    lat:Number,
    lng:Number,
    distance_to_mu:String
}

const FoodSchema= mongoose.Schema(Nearbyfield, { collection: 'Food_Mu', versionKey: false });
const HotelMSchema = mongoose.Schema(Nearbyfield, { collection: 'Hotel_Mu', versionKey: false });
const TravelSchema = mongoose.Schema(Nearbyfield, { collection: 'Travel_Mu', versionKey: false });

const FoodModel = mongoose.model('Food_Mu' , FoodSchema)
const TravelModel = mongoose.model('Travel_Mu' , TravelSchema)
const HotelModel = mongoose.model('Hotel_Mu' , HotelMSchema)

module.exports = {

    FoodModel,
    HotelModel,
    TravelModel
}