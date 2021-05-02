const express = require ('express');
const bodyParser = require('body-parser')
const path = require('path');
const morgan = require ('morgan');

const app = express();
app.use(morgan('dev'));




app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs' );

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
 
app.use(require('./routes/google.route'));

module.exports = app;
