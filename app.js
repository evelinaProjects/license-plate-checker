const HttpError = require('./models/http-error');
require('dotenv').config();


/* Init app */
const express = require('express');
const app = express();


/* Routes handler */
const platesRoutes = require('./routes/plates');
app.use('/', platesRoutes);


/* Erorr handler */
app.use((req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    return next(new HttpError('Could not find this route', 404));
});

const fs = require('fs');
app.use((error, req, res, next) => {
    if(req.file){
        fs.unlink(req.file.path, (e =>{
            console.log(e);
        }));
    }

    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
        .json({ message: error.message || 'An unknown error occurred' });
});

/* handler connection to DB */
const mongoose = require('mongoose');
const port = process.env.PORT || 3002;

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (error) => {
    if (error) {
        console.log('error; ',error);
    } 
    else
        app.listen(port,() => {
            console.log('Server is up on port ' + port);
        });
}); 

