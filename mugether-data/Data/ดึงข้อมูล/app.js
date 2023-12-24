const file = require('./fetcheddata.json')
const fs = require('fs')

let newdata = [];

let name = file.results.map((e) => e.name)
let address = file.results.map((e) => e.vicinity)
let lat = file.results.map((e) => e.geometry.location.lat)
let lng = file.results.map((e) => e.geometry.location.lng)

for(let i =0 ; i<file.results.length;i++)
{
    newdata.push({
        mu_place:'วัดสายไหม',
        name:name[i],
        address:address[i],
        lat:lat[i],
        lng:lng[i]
    })
}

console.log(JSON.stringify(newdata,null,2));
// fs.writeFileSync('finisheddata/wadsaimai.json',JSON.stringify(newdata,null,2));