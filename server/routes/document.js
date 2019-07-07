const express = require("express");
const cors = require('cors');
const Document = require('../models/document');
const VerifyToken = require('../auth/VerifyToken');

const app = express();
app.use(cors());

app.get('/my-documents', VerifyToken, async(req, res) => {
    await Document.find({ user: req.decoded.subject }, (err, documents) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            documents
        });
        return;
    });
});

app.post('/documents', VerifyToken, (req, res) => {
    let body = req.body;

    let document = new Document({
        docName: body.docName,
        title: body.title,
        locale: body.locale,
        relevant: body.relevant,
        task: body.task,
        domain: body.domain,
        keywords: body.keywords,
        date: body.date,
        url: body.url,
        maskedUrl: body.maskedUrl,
        searchSnippet: body.searchSnippet,
        user: body.user
    });

    document.save((err, documentDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            doc: documentDB
        });
    });
});

module.exports = app;