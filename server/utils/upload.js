const express = require("express");
const cors = require('cors');
const multer = require('multer');
var path = require('path');

const app = express();
app.use(cors());

const storage = multer.diskStorage({ //multers disk storage settings
    destination: (req, file, cb) => {
        cb(null, './server/uploads/');
    },
    filename: (req, file, cb) => {
        var datetimestamp = Date.now();
        //console.log(file.originalname);
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

const uploadImage = multer({ //multer settings
    storage,
    fileFilter: (req, file, callback) => {
        var ext = '.' + file.originalname.split('.')[file.originalname.split('.').length - 1].toLowerCase();
        //console.log(ext);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
}).single('file');

const uploadHtml = multer({
    storage,
    fileFilter: (req, file, callback) => {
        var ext = '.' + file.originalname.split('.')[file.originalname.split('.').length - 1].toLowerCase();
        //console.log(ext);
        if (ext !== '.html') {
            return callback(new Error('Only html are allowed'))
        }
        callback(null, true)
    }
}).single('file');

/** API path that will upload the images */
app.post('/upload-image', function(req, res) {
    uploadImage(req, res, function(err) {
        //console.log(req.file);
        if (err) {
            res.status(400).json({
                ok: false,
                message: err.message
            });
            return;
        }
        res.json({
            ok: true,
            message: "File uploaded"
        });
    });
});

/** API path that will upload the html */
app.post('/upload-html', function(req, res) {
    uploadHtml(req, res, function(err) {
        //console.log(req.file);
        if (err) {
            res.status(400).json({
                ok: false,
                message: err.message
            });
            return;
        }
        res.json({
            ok: true,
            message: "File uploaded"
        });
    });
});


module.exports = app;