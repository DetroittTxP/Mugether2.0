const mongoose = require('mongoose')

const MuplaceModel = mongoose.Schema({
    place_id:String,
    name:String,
    address:String,
    type:String,
    rating:Number,
    lat:Number,
    long:Number,
    review:[Object]
},{collection:"Mu_Place",versionKey: false})

module.exports = mongoose.model('Mu_Place', MuplaceModel)