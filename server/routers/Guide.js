const guide = require('express').Router();

guide.get('/',(req,res) => {
     res.send('gudie ok')
})



module.exports = guide;