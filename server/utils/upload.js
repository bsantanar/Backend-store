const express = require("express");
const cors = require('cors');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
const VerifyToken = require('../auth/VerifyToken');

const app = express();
app.use(cors());

const storage = multer.diskStorage({ //multers disk storage settings
    destination: (req, file, cb) => {
        let type = file.mimetype.split('/')[0];
        //console.log(file);
        fs.ensureDirSync(`./server/uploads/${req.decoded.subject}/${type}`);
        cb(null, `./server/uploads/${req.decoded.subject}/${type}`);
    },
    filename: (req, file, cb) => {
        let name = file.originalname.split('.')[0];
        let ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
        let datetimestamp = Date.now();
        //console.log(file.originalname);
        cb(null, name + '-' + datetimestamp + '.' + ext);
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

/** API path that will upload the images */
app.post('/upload-image', VerifyToken, (req, res) => {
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
            message: "Image uploaded"
        });
    });
});

/** API path that will upload the html */
app.post('/upload-html', VerifyToken, (req, res) => {
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
            message: "Html uploaded"
        });
    });
});

app.post('/upload-locale', VerifyToken, (req, res) => {
    uploadLocale(req, res, function(err) {
        if (err) {
            res.status(400).json({
                ok: false,
                message: err.message
            });
            return;
        }
        res.json({
            ok: true,
            message: "Locale uploaded"
        });
    });
});

app.get('/my-images', VerifyToken, (req, res) => {
    let images = [];
    fs.readdir(`./server/uploads/${req.decoded.subject}/image`, (err, files) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: err.message
            });
            return;
        }
        res.status(200).json({
            ok: true,
            images: files
        });
    });
});

app.get('/my-json', VerifyToken, (req, res) => {
    let locales = [];
    fs.readdir(`./server/uploads/${req.decoded.subject}/application`, (err, files) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: err.message
            });
            return;
        }
        res.status(200).json({
            ok: true,
            locales: files
        });
    });
});

app.get('/my-html', VerifyToken, (req, res) => {
    let html = [];
    fs.readdir(`./server/uploads/${req.decoded.subject}/text`, (err, files) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: err.message
            });
            return;
        }
        res.status(200).json({
            ok: true,
            html: files
        });
    });
});

app.post('/download-image/:id', VerifyToken, (req, res) => {
    let pathAux = path.join(__dirname, '..', 'uploads', req.decoded.subject, 'image', req.params.id);
    res.download(pathAux, 'image.jpg', (err) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: err
            });
            return;
        }
    });
});

app.post('/download-html/:id', VerifyToken, (req, res) => {
    let pathAux = path.join(__dirname, '..', 'uploads', req.decoded.subject, 'text', req.params.id);
    res.download(pathAux, 'file.html', (err) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: err
            });
            return;
        }
    });
});

app.post('/download-locale/:id', VerifyToken, (req, res) => {
    let pathAux = path.join(__dirname, '..', 'uploads', req.decoded.subject, 'application', req.params.id);
    res.download(pathAux, 'file.json', (err) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: err
            });
            return;
        }
    });
});

app.delete('/delete-image/:id', VerifyToken, (req, res) => {
    let pathAux = path.join(__dirname, '..', 'uploads', req.decoded.subject, 'image', req.params.id);
    fs.unlink(pathAux, (err) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: err
            });
            return;
        }
        res.status(200).json({
            ok: true,
            message: 'Deleted successufully'
        });
    });
});

app.delete('/delete-html/:id', VerifyToken, (req, res) => {
    let pathAux = path.join(__dirname, '..', 'uploads', req.decoded.subject, 'text', req.params.id);
    fs.unlink(pathAux, (err) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: err
            });
            return;
        }
        res.status(200).json({
            ok: true,
            message: 'Deleted successufully'
        });
    });
});

app.delete('/delete-locale/:id', VerifyToken, (req, res) => {
    let pathAux = path.join(__dirname, '..', 'uploads', req.decoded.subject, 'application', req.params.id);
    fs.unlink(pathAux, (err) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: err
            });
            return;
        }
        res.status(200).json({
            ok: true,
            message: 'Deleted successufully'
        });
    });
});

module.exports = app;