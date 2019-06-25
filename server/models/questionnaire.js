const mongoose = require('mongoose');

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
        type: [String],
        required: [true, 'question(s) is necessary']
    }
});

module.exports = mongoose.model('Questionnaire', questionnaireSchema);