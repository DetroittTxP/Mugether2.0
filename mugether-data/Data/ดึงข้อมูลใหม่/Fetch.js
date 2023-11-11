
const Mudata = require('./mudata_latest.json');

const fs = require('fs')
const getdata = async (Mu_place, Mu_place_lat, Mu_place_long) => {
    try {
        let res = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Mu_place_lat},${Mu_place_long}&radius=20000&keyword=ร้านอาหาร&key=AIzaSyBs3XYHMlCfX7P3vJFrKK_xsiTyztOaQzc&language=th`);
        let data = await res.json();


        let name = data.results.map((e) => e.name);
        let address = data.results.map((e) => e.vicinity);
        let rating = data.results.map((e) => e.rating)
        let lat = data.results.map((e) => e.geometry.location.lat);
        let lng = data.results.map((e) => e.geometry.location.lng);

        let exportdata = [];

        for (let i = 0; i < name.length; i++) {
            exportdata.push({
                mu_place: Mu_place,
                name: name[i],
                rating:rating[i],
                address: address[i],
                lat: lat[i],
                long: lng[i]
            });
        }

        return exportdata;
    } catch (error) {
        throw error;
    }
};

const processdata = async () => {
    let Mu_place = Mudata.map((e) => e.name);
    let Mu_place_lat = Mudata.map((e) => e.lat);
    let Mu_place_long = Mudata.map((e) => e.long);
    let finaldata = [];

    for (let i = 0; i < Mu_place.length; i++) {
        let result = await getdata(Mu_place[i], Mu_place_lat[i], Mu_place_long[i]);

        for (let i = 0; i < result.length; i++) {
            finaldata.push({
                mu_place: result[i].mu_place,
                name: result[i].name,
                rating:result[i].rating,
                address: result[i].address,
                lat: result[i].lat,
                lng: result[i].long
            });
        }
    }

    return finaldata;
};


const saveDataToFile = async () => {
    try {
        let resturant = await processdata();
        let data = JSON.stringify(resturant,null,2);
        fs.writeFileSync('data/Travel_Mu.json', data);
        console.log("SAVED");
    } catch (error) {
        throw error;
    }
};

saveDataToFile();