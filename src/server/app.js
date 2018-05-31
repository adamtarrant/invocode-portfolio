//NPM and Node Modules
const express = require('express');
const https = require('https');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const compression = require('compression');
const enforce = require('express-sslify');

//Init of express app
const app = express();

//Custom JS modules
//Route handlers import
require('./js_modules/randomQuote_handler.js')(app);
require('./js_modules/wikiSearch_handler.js')(app);
require('./js_modules/twitchTv_handler.js')(app);
require('./js_modules/oldPortfolio_handler.js')(app);
require('./js_modules/tribute_handler.js')(app);
require('./js_modules/weatherApp_handler.js')(app);

//Config
const config = process.env.NODE_ENV == 'production' ? require('./config/config_prod.js') : require('./config/config_dev.js');

//Set view engine
app.set('view engine', 'ejs');

//Static middleware
app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../public')));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('There was an error on the server');
    next();
});

//Create mail server
const smtpTransport = nodemailer.createTransport({    
    service: 'Outlook365',  
    auth: config.emailAuth,
    secure: true,
    requireTLS: true
});

//Define form input validation tests
const validator = [
    body('name', 'Name field is empty').isLength({min: 1}).isString().withMessage('Name must be a string'),
    body('email', 'Email field is empty').isLength({min: 1}).isEmail().withMessage('Email should be valid email address'),
    body('message', 'Message field is empty').isLength({min: 1}).isString().withMessage('Message must be a string'),
    sanitizeBody(['name','message']).trim().escape(),
    sanitizeBody('email').normalizeEmail()
];

///Route handlers
//Core site
app.get('/', (req,res) => {
        res.render('pages/index', {}, (err, html) => {
            if(err) {
                console.error(err.stack);
                res.status(500).send('There was an error on the server');
            } else {
                res.send(html);
            }
        });
});

app.post('/form_post', validator, (req,res) => {
    try {
    let errors = validationResult(req);
    console.log(errors.array());
    
    if (!errors.isEmpty()) {
        res.send(errors.array());
        return;
      } else {
         let mailOptions = {
            from: 'web.form@invocode.io',
            to: 'contact@invocode.io',
            subject: 'Webform message from ' + req.body.name + ' - email: ' + req.body.email,
            text: req.body.message
          };

          smtpTransport.sendMail(mailOptions, (err, info) => {
            if (err) {
                res.status(500).send('There was an error with the email service')
                throw err;
            }
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end('message received');
          });
        
      }
    } catch(err) {
        console.error(err.stack);
        res.status(202).send('There was an error sending the message, please use one the other methods to contact me');
    }
});

//Catch all for unhandled routes
app.all('/*', (req, res) => {
   
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found.");
});

//Exported functions and objects
module.exports = {
    app
};