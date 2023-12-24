const Muplace_data = require('../mudata/mudata_latest_2.json');
const fs = require('fs');

const getrawdata = async (Mu_place, Mu_place_lat, Mu_place_long) => {
    try{
        let res = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Mu_place_lat},${Mu_place_long}&radius=15000&keyword=ร้านอาหาร&key=AIzaSyCAA86m3sjNW8C1mCXvHtk2_He59BWytCI&language=th`)
        let data = await res.json();

        if(data.status === 'OK')
        {
            return data.results.map((e) => ({
                place_id: e.place_id,
                mu_place: Mu_place,
                name: e.name,
                rating: e.rating,
                address: e.vicinity,
                lat: e.geometry.location.lat,
                lng: e.geometry.location.lng
            }))
        }
        
    }catch(err)
    {
        throw err;
    }
}

const getdata = async () =>{
    let finaldata = [];

    for(let i = 0 ;i<Muplace_data.length;i++)
    {
        let res = await getrawdata(Muplace_data[i].name,Muplace_data[i].lat,Muplace_data[i].long);
        
        for(let i = 0;i<res.length;i++)
        {
            finaldata.push({
                place_id:res[i].place_id,
                mu_place:res[i].mu_place,
                name:res[i].name,
                rating:res[i].rating,
                address:res[i].address,
                lat:res[i].lat,
                lng:res[i].lng
            })
        }
    }

    return finaldata;
}

const save = async () =>{
    try{
        let data = await getdata();
        fs.writeFileSync('../mudata2/Food_Mu.json',JSON.stringify(data,null,2));
        console.log('saved');
        return;
    }
    catch(err){
        console.log(err);
    }
}

save();