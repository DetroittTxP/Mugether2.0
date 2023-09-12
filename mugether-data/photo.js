const axios = require('axios');
const fs = require('fs');
const path = require('path');

const Travel = require('./Photoref/Travel_Ref.json')
const hotel = require('./Photoref/Hotel_Ref.json')
const Food = require('./Photoref/Food_Ref.json')


const downloadPhoto = async (name,photo_ref,i) => {
    try{
        
      await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photo_ref}&key=AIzaSyCAA86m3sjNW8C1mCXvHtk2_He59BWytCI`,{ responseType: 'stream' })
      .then((res) => {

           let photo_name = `photofile/Nearby/hotel/${name}/${name}${i}.jpg`
           let photodir = path.dirname(photo_name)

           if(!fs.existsSync(photodir)){
            fs.mkdirSync(photodir, { recursive: true });
           }


           res.data.pipe(fs.createWriteStream(photo_name));
           return;
      })
      
    }
    catch(err){
        console.log(err);
        return;
    }
}

const run= async () => {
    try{
         for(let i = 0 ;i<hotel.length;i++)
         {
            for(let j = 0;j<hotel[i].photoref.length;j++)
            {
                 await downloadPhoto(hotel[i].name,hotel[i].photoref[j],j+1);
               
            }
            console.log(i, ' จาก ',hotel.length);
         }
        console.log('ok');
        return;
    }catch(err){
        console.log(err);
        return;
    }

}











//newdata.forEach((e) => e.place_ref.forEach((item,i) => console.log(i+1)))
run();

//downloadPhoto('สถานที่นี้เอง',"AUacShhlxg8Fb0q_FWro8AdUOkuhjoHSHGv2NVC0DtOMxE-j1ocwCMYINn2YyjGf-u5zYqehPTw-YihojHIZECM25YgmmMQtVE_Ix2i50FDx7oDLqVd4vXiVeBXNvS8TZCXyUDjlUpd8GGxOm73E_fUYUNvQ9SjZfTkK9BVgeNoxoT3iBMfi",'1')