//NPM and Node Modules
const express = require('express');
const https = require('https');
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
    service: 'Outlook365',  
    auth: config.emailAuth
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
    console.log(req.body);

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

//Random quote page route handlers
app.get('/randomquote', (req, res) => {
    res.render('pages/randomquote', {}, (err, html) => {
        if(err) {
            console.error(err.stack);
            res.status(500).send('There was an error on the server');
        } else {
            res.send(html);
        }
    });
});

app.get('/randomquote/newquote', (req, res) => {
    try {
    randomQuoteReq()
        .then(quoteRes => {
            res.send(quoteRes);
        })
        .catch(err => {
            console.error(err.stack);
            res.status(500).send('There was an error on the server');
        });
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('There was an error on the server');
    }
});

//Wikipedia search engine route handler
app.get('/wikisearch', (req, res) => {
    res.render('pages/wikisearch', {}, (err, html) => {
        if(err) {
            console.error(err.stack);
            res.status(500).send('There was an error on the server');
        } else {
            res.send(html);
        }
    });
});

app.get('/wikisearch/search', (req, res) => {
    try {
    wikiSearchReq(req.query.q)
        .then(apiRes => {
            res.send(apiRes);
        })
        .catch(err => {
            console.error(err.stack);
            res.status(500).send('There was an error on the server');
        });
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('There was an error on the server');
    }
});

//Twitch tv project route handler
app.get('/twitchtv', (req, res) => {
    try {
        res.render('pages/twitchtv', {}, (err, html) => {
            if(err) {
                console.error(err.stack);
                res.status(500).send('There was an error on the server');
            } else {
                res.send(html);
            }
        });
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('There was an error on the server');
    }
});

//Tribute page route handler
app.get('/tribute', (req, res) => {
    try {
        res.render('pages/tribute', {}, (err, html) => {
            if(err) {
                console.error(err.stack);
                res.status(500).send('There was an error on the server');
            } else {
                res.send(html);
            }
        });
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('There was an error on the server');
    }
});

//Old portfolio site route handler
app.get('/oldportfolio', (req, res) => {
    try {
        res.render('pages/oldportfolio', {}, (err, html) => {
            if(err) {
                console.error(err.stack);
                res.status(500).send('There was an error on the server');
            } else {
                res.send(html);
            }
        });
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('There was an error on the server');
    }
});

//Weatherapp route handler
app.get('/weatherapp', (req, res) => {
    try {
        res.render('pages/weatherapp', {}, (err, html) => {
            if(err) {
                console.error(err.stack);
                res.status(500).send('There was an error on the server');
            } else {
                res.send(html);
            }
        });
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('There was an error on the server');
    }
});

//Catch all for unhandled routes
app.all('/*', (req, res) => {
   
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found.");
});


//Named function declarations
function randomQuoteReq () {
    return new Promise((resolve, reject) => {
        let reqParams = {
            method: 'GET',
            hostname: 'andruxnet-random-famous-quotes.p.mashape.com',
            path: '/?cat=',
            headers: {
                "X-Mashape-Key": config.randomQuoteApiKey,
                "Content-Type": 'application/x-www-form-urlencoded',
                Accept: "application/json"
            }
        }
    
        let quoteReq = https.request(reqParams, (res) => {
            if (res) {
                let quoteRes = '';
                res.on('data', d => quoteRes += d);
                res.on('end', () => resolve(quoteRes));
            } else {
                reject('https request failed');
            }
        });
        quoteReq.on('error', err => {
            console.log('err is' + err);
            reject(err);
        });
        quoteReq.end();
    });
}

function wikiSearchReq (searchTerm) {
    return new Promise((resolve, reject) => {
        let reqParams = {
            method: 'GET',
            hostname: 'en.wikipedia.org',
            path: '/w/api.php?action=query&format=json&origin=*&prop=extracts|pageimages&list=&generator=search&exchars=150&exintro=1&explaintext=1&piprop=thumbnail|name&pithumbsize=200&gsrenablerewrites=1&gsrsearch=' + searchTerm,
            headers: {
                "Api-User-Agent": "AdamTazWikiViewer/1.0; FreeCodeCampExercise"
            }
        }
    
        let req = https.request(reqParams, (res) => {
            if (res) {
                let completeRes = '';
                res.on('data', d => completeRes += d);
                res.on('end', () => resolve(completeRes));
            } else {
                reject('https request failed');
            }
        });
        req.on('error', err => {
            console.log('err is' + err);
            reject(err);
        });
        req.end();
    });
}


//Exported functions and objects
module.exports = {
    app
};