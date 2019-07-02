const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let questionnaireSchema = new Schema({
    instructions: {
        type: String,
        required: [true, 'instructions is necessary']
    },
    questionnaireId: {
        type: String,
        required: [true, 'questionnaire id is necessary']
    },
    questions: {
        type: [ObjectId],
        required: [true, 'question(s) is necessary']
    },
    createdBy: {
        type: ObjectId,
        required: [true, 'user id is necessary']
    }
});

module.exports = mongoose.model('Questionnaire', questionnaireSchema);