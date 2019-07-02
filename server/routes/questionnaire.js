const express = require("express");
const cors = require('cors');
const Questionnaire = require('../models/questionnaire');
const VerifyToken = require('../auth/VerifyToken');

const app = express();
app.use(cors());

app.get('/my-questionnaires', VerifyToken, async(req, res) => {
    await Questionnaire.find({ createdBy: req.decoded.subject }, (err, questionnaires) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            questionnaires
        });
    });
});

app.get('/questionnaires', VerifyToken, (req, res) => {
    Questionnaire.find((err, questionnaires) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            questionnaires
        });
        return;
    });
});

app.post('/questionnaires', VerifyToken, (req, res) => {
    let body = req.body;

    let questionnaire = new Questionnaire({
        questionnaireId: body.questionnaireId,
        instructions: body.instructions,
        questions: body.questions,
        createdBy: body.user
    });

    questionnaire.save((err, questionnaireDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            questionnaire: questionnaireDB
        });
    });
});

app.get('/questionnaire/:id', VerifyToken, (req, res) => {
    Questionnaire.findById(req.params.id, (err, questionnaire) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            questionnaire
        });
    });
});

app.put('/questionnaire/:id', VerifyToken, (req, res) => {
    Questionnaire.findByIdAndUpdate(req.params.id, req.body, (err, questionnaire) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            questionnaire
        });
    });
});

app.delete('/questionnaire/:id', VerifyToken, (req, res) => {
    Questionnaire.findByIdAndRemove(req.params.id, (err, questionnaire) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            message: "deleted successufully"
        });
    });
});


module.exports = app;