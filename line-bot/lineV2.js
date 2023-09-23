const express = require('express');
const {MongoClient} = require('mongodb')
const line = require('@line/bot-sdk')
require('dotenv').config();

const app = express();
const lineConfig = {
    channelAccessToken:process.env.LINE_ACCESS_TOKEN,
    channelSecret:process.env.LINE_CHANNEL_SECRET

}

const client = new line.Client(lineConfig)
const Db_Client = new MongoClient(process.env.CONNECT_STRING)


app.post('/webhook',line.middleware(lineConfig) , async (req,res) => {
    try{

        const {events} = req.body;
        if(events.length > 0){
            await events.map(e => handleEvents(e))
        }
        else{
            res.send('OK').status(200)
        }
    }
    catch(err){
        res.send(err).status(500)
    }
})


const handleEvents = async (events) =>{

    if(events.type === 'message' && events.message.type === 'location'){
        const {latitude,longitude} = events.message
        console.log(latitude,latitude);

        
        
       




    }
    else{
        return;
    }


}



app.get('/location',(req,res) => {

})




app.listen(process.env.PORT,() => {
    console.log('server ok on ',process.env.PORT);
})