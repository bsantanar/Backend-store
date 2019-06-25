const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let questionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is necessary']
    },
    questionId: {
        type: String,
        required: [true, 'question id is necessary']
    },
    required: {
        type: Boolean
    },
    type: {
        type: String,
        required: [true, 'type of question is necessary']
    },
    hint: {
        type: String
    }
}, { strict: false });

module.exports = mongoose.model('Question', questionSchema);