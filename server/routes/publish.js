const express = require("express");
const cors = require('cors');
const Publish = require('../models/publish');
const VerifyToken = require('../auth/VerifyToken');

const app = express();
app.use(cors());

app.post('/publish', VerifyToken, (req, res) => {
    let body = req.body;
    
    let publish = new Publish({
        date: new Date(Date.now()),
        user: body.user,
        password: body.password,
        docs: body.docs,
        study: body.study
    });

    publish.save((err, pub) => {
        if(err){
            return res.status(409).json({
                ok: false,
                message: err
            });
        }
        res.status(200).json({
            ok: true,
            data: pub
        });
    });
});

module.exports = app;