//NPM and Node Modules
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


//Config
const config = process.env.NODE_ENV == 'production' ? require('./config/config_prod.js') : require('./config/config_dev.js');

//Init of express app
const app = express();

//Set view engine
app.set('view engine', 'ejs');

//Static middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../public')));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('There was an error on the server');
});

//Create mail server
const smtpTransport = nodemailer.createTransport({    
    service: 'Godaddy',
    host: "smtpout.secureserver.net",  
    secure: true,
    port: 465,
    auth: {
        user: "username",
        pass: "password" 
    }
});

//Define form input validation tests
const validator = [
    body('name', 'Name field is empty').isLength({min: 1}).isString().withMessage('Name must be a string'),
    body('email', 'Email field is empty').isLength({min: 1}).isEmail().withMessage('Email should be valid email address'),
    body('phone', 'Phone number field is empty').isLength({min: 1}).isMobilePhone("en-gb").withMessage('Enter a valid UK mobile phone number'),
    body('message', 'Message field is empty').isLength({min: 1}).isString().withMessage('Message must be a string'),
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
    console.log(req.body);

    let errors = validationResult(req);
    console.log(errors.isEmpty());
    
    if (!errors.isEmpty()) {
        res.send(errors);
        return;
      } else {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end('message received');
        
        /* let mailOptions = {
            from: 'youremail@gmail.com',
            to: 'myfriend@yahoo.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
          };

          smtpTransport.sendMail(mailOptions, (err, info) => {
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end('message received');
          }); */
        
      }
    } catch(err) {
        console.error(err.stack);
        res.status(202).send('There was an error sending the message, please use one the other methods to contact me');
    }
});

app.all('/*', (req, res) => {
    console.log("entered route");
    
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found.");
});

//Named function declarations



//Exported functions and objects
module.exports = {
    app
};