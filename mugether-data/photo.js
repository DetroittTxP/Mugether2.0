const fixed1 = require('./Photoref/Food_Ref.json')
const fixed2 = require('./Photoref/Hotel_Ref.json')
const fixed3 = require('./Photoref/Travel_Ref.json')
const fs = require('fs');

let newdata1 = fixed1.filter( e => Object.keys(e).length !== 0)
let newdata2 = fixed2.filter( e => Object.keys(e).length !== 0)
let newdata3 = fixed3.filter( e => Object.keys(e).length !== 0)

fs.writeFileSync('Food_Ref3333333333.json',JSON.stringify(newdata3,null,2));