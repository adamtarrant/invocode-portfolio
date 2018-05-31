const config = process.env.NODE_ENV == 'production' ? require('../config/config_prod.js') : require('../config/config_dev.js');
const https = require('https');

module.exports = function(app) {

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
            res.send(quoteRes[0]);
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
}

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
                res.on('end', () => resolve(JSON.parse(quoteRes)));
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
