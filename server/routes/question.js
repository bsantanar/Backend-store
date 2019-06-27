const express = require("express");
const cors = require('cors');
const Question = require('../models/question');
const VerifyToken = require('../auth/VerifyToken');

const app = express();
app.use(cors());


app.get('/questions', (req, res) => {
    Question.find((err, questions) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            questions
        });
    })
});

app.post('/questions', (req, res) => {
    let body = req.body;
    //console.log(body);
    let question = new Question({
        title: body.title,
        questionId: body.questionId,
        type: body.type,
        required: body.required,
        hint: body.hint
    });

    if (body.options) {
        question.set('options', body.options);
    } else if (body.type == "scale") {
        question.set('min', body.min);
        question.set('max', body.max);
        question.set('step', body.step);
        question.set('minLabel', body.minLabel);
        question.set('maxLabel', body.maxLabel);
    } else if (body.maxStars) {
        question.set('maxStars', body.maxStars);
    }

    question.save((err, questionDB) => {
        if (err) {
            return res.status(409).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            question: questionDB
        });
    })
});

app.get('/question/:id', (req, res) => {
    Question.findById(req.params.id, (err, question) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            question
        });
    })
});


module.exports = app;