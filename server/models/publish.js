const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let publishSchema = new Schema({
    date: {
        type: Date
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
}, { strict: false });


module.exports = mongoose.model('Publish', publishSchema);