const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let studySchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: [true, 'title is necessary']
    },
    locale: {
        type: String,
        required: [true, 'locale is necessary']
    },
    domain: {
        type: String,
        required: [true, 'domain is necessary']
    },
    task: {
        type: String,
        required: [true, 'task is necessary']
    },
    maxGlobalTime: {
        type: Number,
        required: [true, 'maxGlobalTime is necessary']
    },
    minBookmarks: {
        type: Number,
        required: [true, 'min bookmarks is necessary']
    },
    maxBookmarks: {
        type: Number,
        required: [true, 'max bookmarks is necessary']
    },
    minSnippetsPerPage: {
        type: Number,
        required: [true, 'min snippets is necessary']
    },
    maxSnippetsPerPage: {
        type: Number,
        required: [true, 'max snippets is necessary']
    },
    minSnippetWordLength: {
        type: Number,
        required: [true, 'min snippet word is necessary']
    },
    maxSnippetWordLength: {
        type: Number,
        required: [true, 'max snippet word is necessary']
    },
    snippetWordTruncateThreshold: {
        type: Number,
        required: [true, 'snippet word truncate is necessary']
    },
    minSynthesisWordLength: {
        type: Number,
        required: [true, 'min synthesis word is necessary']
    },
    minSynthesisCharLength: {
        type: Number,
        required: [true, 'min synthesis char is necessary']
    },
    syhtesisAutosaveInterval: {
        type: Number,
        required: [true, 'synth autosave interval is necessary']
    },
    maxStars: {
        type: Number,
        required: [false]
    },
    replaceWithRelevantDocuments: {
        type: Boolean
    },
    taskPage: {
        type: String,
        required: [true, 'task page is necessary']
    },
    avatar: {
        type: String,
        required: [true, 'avatar is necessary']
    },
    stages: {
        type: [ObjectId],
        required: [true, 'stage(s) is necessary']
    },
    user: {
        type: ObjectId,
        required: [true, 'user id is necessary']
    },
    public: {
        type: Boolean,
        required: [true, 'public is required']
    },
    tags: {
        type: [String]
    }
}, { strict: false });

studySchema.plugin(uniqueValidator, { message: 'Title already exists' });

module.exports = mongoose.model('Study', studySchema);