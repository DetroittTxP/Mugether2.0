const mu_place = require('../model/MuPlace-Model');
const mu = require('express').Router();


mu.get('/mudata',async (req,res) => {
    try{
        let result = await mu_place.find({});
        return res.json(result)
    }
    catch(err){
        return res.send(err);
    }
})

mu.get('/mudata/:name',async (req,res) => {
    try{
        let result = await mu_place.find({name:req.params.name});
        return res.json(result)
    }
    catch(err){
        return res.send(err)
 }
})

mu.post('/addreviewmuplace',async (req,res) => {
    const {reviewdetail,muplacename} = req.body;
    try{
        let result = await mu_place.updateOne(
               {name:muplacename},
               {
                  $push:{review:reviewdetail} 
               }
        )
        res.json(result)

 }
 catch(err){
        return res.send(err)
 }

})










module.exports = mu;
