const mongoose = require('mongoose');


const plateSchema = new mongoose.Schema({
    imageName : {
        type: String,
    },
    plateText: {
        type: String,
    },
    category: {
        type: String,
    },
    decision: {
        type: String,
        required: true,
        minlength: 6
    },
}, { timestamps: { createdAt: 'created_at' }});


module.exports = mongoose.model('Plate', plateSchema);