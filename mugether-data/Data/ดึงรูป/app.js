const data = require('./data.json');

console.log(data.result.photos.map((e) => e.photo_reference));