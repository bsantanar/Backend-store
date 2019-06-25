const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let synthesisSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is necessary']
    },
    synthesisId: {
        type: String,
        required: [true, 'synthesis id is necessary']
    }
});

module.exports = mongoose.model('Synthesis', synthesisSchema);