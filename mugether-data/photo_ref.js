require('dotenv').config();
const travel = require('./rawfile/JSON/Hotel_Mu_3.json')


const axios = require('axios')
const fs = require('fs')



const getref=async (name,id) => {
    try{
        let res = await axios.get('https://maps.googleapis.com/maps/api/place/details/json',{
            params:{
                placeid:id,
                key:process.env.POND_KEY,
                language:'th'
            }
        })

    
        let ref = test.result.photos.map(e => e.photo_reference)

        
        let d = {
            name:name,
            photoref:ref//this is arrayu
        }

        return d;
    }
    catch(err){
        console.log(err);
        return err;
    }
}   

const processdata= async()=>{
       let arr = [];

    try{
        for(let i =0  ;i<travel.length;i++){
            let data = await getref(travel[i].name,travel[i].place_id)
            arr.push(data);
        }

        fs.writeFileSync('./Photoref/Hotel_Ref.json',JSON.stringify(arr,null,2));
        console.log('ok');
    }
    catch(err)
    {
        console.log(err);
        return;
    }
}

processdata();

