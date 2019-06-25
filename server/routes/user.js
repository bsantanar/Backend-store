const express = require("express");
const bcrypt = require('bcrypt');
const User = require('../models/user');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const VerifyToken = require('../auth/VerifyToken');

const app = express();
app.use(cors());


app.get('/users', function(req, res) {
    res.json("get users");
});

app.get('/checkToken', VerifyToken, (req, res, next) => {
    res.status(200).json({
        ok: true
    });
})

app.post('/register', (req, res) => {
    let body = req.body;

    let user = new User({
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        name: body.name,
        institution: body.institution
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(409).json({
                ok: false,
                err
            });
        }

        let payload = { subject: user._id };
        let token = jwt.sign(payload, 'store2019', { expiresIn: 86400 });
        res.status(200).json({
            ok: true,
            user: userDB,
            token
        });
    });

});

app.post('/login', (req, res) => {
    let body = req.body;

    User.findOne({ email: body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            if (!user) {
                return res.status(400).json({
                    ok: false,
                    message: "Invalid email"
                });
            } else if (bcrypt.compareSync(body.password, user.password)) {
                let payload = { subject: user._id };
                let token = jwt.sign(payload, 'store2019', { expiresIn: 86400 });
                return res.status(200).json({
                    ok: true,
                    message: "Logged in successfully",
                    user,
                    token
                });
            } else {
                return res.status(401).json({
                    ok: false,
                    message: "Invalid password"
                });
            }
        }

    });

});

module.exports = app;