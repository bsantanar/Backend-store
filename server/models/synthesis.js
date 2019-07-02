const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let synthesisSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is necessary']
    },
    synthesisId: {
        type: String,
        required: [true, 'synthesis id is necessary']
    },
    createdBy: {
        type: ObjectId,
        required: [true, 'user id is necessary']
    }
});

module.exports = mongoose.model('Synthesis', synthesisSchema);