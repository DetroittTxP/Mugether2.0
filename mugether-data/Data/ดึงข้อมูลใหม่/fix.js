const data = require('./response.json')


        let name = data.results.map((e) => e.name);
        let address = data.results.map((e) => e.vicinity);
        let rating = data.results.map((e) => e.rating)
        let lat = data.results.map((e) => e.geometry.location.lat);
        let lng = data.results.map((e) => e.geometry.location.lng);

        let exportdata = [];

        for (let i = 0; i < data.results.length; i++) {
            exportdata.push({
                mu_place: "ถ้ำนาคา",
                name: name[i],
                rating:rating[i],
                address: address[i],
                lat: lat[i],
                lng: lng[i]
            });
        }

     console.log(JSON.stringify(exportdata,null,2));

