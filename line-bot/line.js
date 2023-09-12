require('dotenv').config();
const express = require('express');
const axios = require('axios');
const line = require('@line/bot-sdk')

const app = express();
const lineConfig = {
    channelAccessToken:process.env.LINE_ACCESS_TOKEN,
    channelSecret:process.env.LINE_CHANNEL_SECRET

}


const client = new line.Client(lineConfig)

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

const handleEvents=(events)=>{
     console.log(events);
     
     if(events.type === 'message' && events.message.type === 'text'){

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
     }
}


app.get('/test',(req,res) => {
    res.send('test ok')
})


app.listen(process.env.PORT,() => {
    console.log('server ok on ',process.env.PORT);
})

