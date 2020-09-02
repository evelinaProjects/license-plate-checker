const express = require('express');
const router = express.Router();

const {checkPlate} = require('../controllers/plates.js');

const fileUpload = require('../middleware/file-upload');


router.get('/', (req, res, next) => {
    res.status(201).send('hello');

});

router.post('/', fileUpload.single('plate'), checkPlate);





module.exports = router;