var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
const fileUpload = require('express-fileupload');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(fileUpload({ safeFileNames: true, preserveExtension: true }))

app.set('view engine', 'ejs');
app.set('views', './app/views');

consign()
    .include('./app/routes')
    .into(app);

module.exports = app;