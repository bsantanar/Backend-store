const express = require("express");
const cors = require('cors');
const Synthesis = require('../models/synthesis');
const VerifyToken = require('../auth/VerifyToken');

const app = express();
app.use(cors());


app.get('/synthesis', (req, res) => {
    Synthesis.find((err, synthesis) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            synthesis
        });
    })
});

app.post('/synthesis', (req, res) => {
    let body = req.body;

    let synthesis = new Synthesis({
        title: body.title,
        synthesisId: body.synthesisId
    });

    synthesis.save((err, synthesisDB) => {
        if (err) {
            return res.status(409).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            synthesis: synthesisDB
        });
    })
});

module.exports = app;