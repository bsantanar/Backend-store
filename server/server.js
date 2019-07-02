require('./config/config');

const express = require("express");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/user'));
app.use(require('./routes/question'));
app.use(require('./routes/synthesis'));
app.use(require('./routes/questionnaire'));


mongoose.connect('mongodb://localhost:27017/store-test', { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    console.log("Database online");
});


app.listen(process.env.PORT, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});