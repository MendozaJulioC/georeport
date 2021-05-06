require('dotenv').config();
const express = require('express');
const cors = require('cors');
const EventEmitter = require('events');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


const app = express();
require('./config/configPassport');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());



app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs' );
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
var cookieparser = require("cookieparser");
cookieparser.parse("foo=bar");

app.use(session({
    secret:process.env.SECRET,
    resave : false,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

app.use((req, res, next)=>{
    res.locals.message = req.flash('message');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    console.log(res.locals.error)
    next();
});


app.use(require('./routes/google.routes'));
app.use(require('./routes/index'));

const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.setMaxListeners(0)
emitter.emit('log');


module.exports = app;