const fs = require('fs');
const path = require('path');

// const rootDirectory = './mugether-data/photofile/Muplace';
// const Mu_PLACE = require('../mugether-data/rawfile/JSON/mudata_latest_3.json')

const rootDirectory = './mugether-data/photofile/Nearby/hotel'
const Mu_PLACE = require('../mugether-data/rawfile/JSON/Hotel_Mu_3.json')

const imagePaths = [];


const FindImages = (directory) => {
    const files = fs.readdirSync(directory);
    


    files.forEach((e) => {
        let filePath = path.join(directory, e);

        if(fs.statSync(filePath).isDirectory()){
            FindImages(filePath);
        }
        else{
            let fileExtension = path.extname(e).toLowerCase();
            if (['.jpg'].includes(fileExtension)) {
                imagePaths.push(filePath.replace(/\\/g,'/'));
              }  
        }
    })
}



FindImages(rootDirectory);
console.log(imagePaths);

let newnewnew = Mu_PLACE.map( e => {
     return {
        ...e,
        photo_path:[]
     }
})


for(let i =0 ; i<newnewnew.length;i++){

    for(let j = 0;j<imagePaths.length;j++){
        
         if(imagePaths[j].includes(newnewnew[i].name)){
              newnewnew[i].photo_path.push(imagePaths[j])
         }
         else{
            continue;
         }
    }
}



console.log(newnewnew);

fs.writeFileSync('testHOTEL.json',JSON.stringify(newnewnew,null,2))