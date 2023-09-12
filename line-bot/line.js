require('dotenv').config();
const express = require('express');
const axios = require('axios');
const line = require('@line/bot-sdk')
const {MongoClient} = require('mongodb')

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
      //  console.log(events[0].message.text);
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

const handleEvents= async (events)=>{
     console.log(events);
     
     if(events.type === 'message' && events.message.type === 'text'){

        try{
            let nearby = await axios.get('http://localhost:1111/location',{
                params:{
                    mu_place:events.message.text
                }
            })

            console.log(nearby);
        }
        catch(err){
            console.log(err);
            return;
        }

        // const messages = [
        //     {
        //       type: 'text',
        //       text: 'รักบีมครับ',
        //     },
        //     {
        //       type: 'text',
        //       text: 'HI BABY',
        //     },
    
        //   ];

        //   if(events.message.text === 'รักปอน'){
             
        //       client.replyMessage(events.replyToken,{type:"text",text:'ME TOOOO'})
            
        //   }else{
        //      client.replyMessage(events.replyToken,{type:"text",text:'พิมไรง่ะ ขออีกที'})
        //   } 
        

        console.log(events.message.text);

        
       
     }
}


app.get('/test',(req,res) => {
    res.send('test ok')
})







//db
app.get('/location',async (req,res) => {
    await Db_Client.connect();

    const {mu_place,menu} = req.query;

    let results = await Db_Client.db(process.env.DB).collection(process.env.FOOD_MU).find({ mu_place: {$regex:mu_place} }).toArray();
    res.json(results);
})









app.listen(process.env.PORT,() => {
    console.log('server ok on ',process.env.PORT);
})

