const fs = require('fs');

const muplace = require('./rawfile/JSON/mudata_latest_V4.json');



let newmuplace = muplace.map(e => {
    return {
        place_id:e.place_id,
        name:e.name,
        address:e.address,
        type: e.type,
        rating: e.rating,
        lat: e.lat,
        long: e.long,
        review:[]
    }
})

fs.writeFileSync('mudata-fixed.json',JSON.stringify(newmuplace,null,2))

console.log(newmuplace);