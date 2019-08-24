const multer = require('multer');
const fs = require('fs-extra');

const storage = multer.diskStorage({ //multers disk storage settings
    destination: (req, file, cb) => {
        let type = file.mimetype.split('/')[0];
        //console.log(file);
        if (req.headers.type) {
            if (req.headers.type == 1) {
                fs.ensureDirSync(`./server/uploads/${req.decoded.subject}/modal`);
                cb(null, `./server/uploads/${req.decoded.subject}/modal`);
            } else {
                fs.ensureDirSync(`./server/uploads/${req.decoded.subject}/template`);
                cb(null, `./server/uploads/${req.decoded.subject}/template`);
            }
        } else {
            fs.ensureDirSync(`./server/uploads/${req.decoded.subject}/${type}`);
            cb(null, `./server/uploads/${req.decoded.subject}/${type}`);
        }
    },
    filename: (req, file, cb) => {
        let name = file.originalname.split('.')[0];
        let ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
        //console.log(file.originalname);
        cb(null, name + '.' + ext);
    }
});

const uploadImage = multer({ //multer settings
    storage,
    fileFilter: (req, file, callback) => {
        let ext = '.' + file.originalname.split('.')[file.originalname.split('.').length - 1].toLowerCase();
        //console.log(ext);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only JPG, PNG, GIF, JPEG are allowed'))
        }
        callback(null, true)
    }
}).single('file');

const uploadHtml = multer({
    storage,
    fileFilter: (req, file, callback) => {
        let ext = '.' + file.originalname.split('.')[file.originalname.split('.').length - 1].toLowerCase();
        //console.log(ext);
        if (ext !== '.html') {
            return callback(new Error('Only html are allowed'))
        }
        callback(null, true)
    }
}).single('file');

const uploadLocale = multer({
    storage,
    fileFilter: (req, file, callback) => {
        let ext = '.' + file.originalname.split('.')[file.originalname.split('.').length - 1].toLowerCase();
        if (ext !== '.json') {
            return callback(new Error('Only json are allowed'));
        }
        callback(null, true);
    }
}).single('file');

module.exports = { uploadHtml, uploadImage, uploadLocale, storage };