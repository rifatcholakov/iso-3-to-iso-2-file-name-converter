const fs = require('fs');

// Configure
const pathToJsonMap = './mapping/iso-2-to-iso-3.json';
const pathToFiles = './images/';
const filesExtension = '.svg';
const resultFolder = './result/';
const formatToConvertTo = "iso3";
////////////////////////////

fs.readFile(pathToJsonMap, function(error, data) {
    if (error) {
        console.log("Error reading file: ", error);
        return;
    }

    const currentFormat = getCurrentFormat(formatToConvertTo); 

    var obj = JSON.parse(data);
    
    obj.forEach((element, index) => {
        const oldPath = pathToFiles + element[currentFormat].toLowerCase() + filesExtension;
        const newPath = resultFolder + element[formatToConvertTo].toLowerCase() + filesExtension;

        fs.rename(oldPath, newPath, function(err) {
            if (err) { 
                console.log('Error renaming file: ' + err);
                return;
            };

            console.log(`File ${oldPath} renamed successfully to ${newPath}!`);
        });
    })
});
    


function getCurrentFormat(formatToConvertTo) {
    let currentFormat;

    if(formatToConvertTo.toLowerCase() === 'iso2') {
        currentFormat = 'iso3';
    }
    
    if(formatToConvertTo.toLowerCase() === 'iso3') {
        currentFormat = 'iso2'
    }

    return currentFormat;
}