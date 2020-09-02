
const HttpError = require('../models/http-error');
const Plate = require('../models/plate');
const {check} = require('../util/checkText');
 

const ocrSpaceApi = require('ocr-space-api');
const { Error } = require('mongoose');
var options = {
    apikey: process.env.API_KEY,
    language: 'eng', 
    imageFormat: 'image/png', 
    isOverlayRequired: false
};


const checkPlate = async (req, res, next) => {
    const imageName = req.imageName ;
    console.log(`Get new request to check plate, image name: ${imageName}`);
    try {
        const parsedResult = await ocrSpaceApi.parseImageFromLocalFile(req.file.path, options);
        if(!parsedResult.parsedText) {
            throw Error(parsedResult);
        }
        console.log(`${imageName}: parsed result from ocrSpaceApi: `,{parsedText: parsedResult.parsedText});

        const plateText = parsedResult.parsedText.split('\r\n').join("").split('-').join("").split(' ').join("").split('IL').join("");
        console.log(`${imageName}: tplateText : ${plateText}`);

        const ans = check(plateText);
        console.log(`${imageName}: result of check : `,ans);

        const plate = new Plate({
            imageName,
            plateText,
            category: ans.category,
            decision: ans.decision
        }); 


        await plate.save();
        console.log(`${imageName}: plate saved to DB with id: ${plate._id}`);
        res.send(plate.decision)
    } catch (error) {
        console.log(`${imageName} \t checkPlate error: \n${error}`);
        return next(new HttpError('Check plate failed.', 500));
    }
};



module.exports = {
    checkPlate
};