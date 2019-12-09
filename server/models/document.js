const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let documentSchema = new Schema({
    docName: {
        type: String,
        required: [true, 'document name is necessary']
    },
    title: {
        type: String,
        required: [true, 'title is necessary']
    },
    locale: {
        type: Object,
        required: [true, 'locale is necessary']
    },
    relevant: {
        type: Boolean
    },
    task: {
        type: [Object],
        required: [true, 'tasks is necessary']
    },
    domain: {
        type: [Object],
        required: [true, 'domains is necessary']
    },
    keywords: {
        type: [String]
    },
    date: {
        type: Date,
        required: [true, 'date is necessary']
    },
    url: {
        type: String,
        required: [true, 'url is necessary']
    },
    maskedUrl: {
        type: String
    },
    searchSnippet: {
        type: String
    },
    user: {
        type: ObjectId,
        required: [true, 'user id is necessary']
    }
});

documentSchema.plugin(uniqueValidator, { message: '{PATH} already exists' });

module.exports = mongoose.model('Document', documentSchema);