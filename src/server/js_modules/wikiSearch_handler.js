const config = process.env.NODE_ENV == 'production' ? require('../config/config_prod.js') : require('../config/config_dev.js');
const https = require('https');

module.exports = function(app) {
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
    console.log(req.url);
    
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
}

function wikiSearchReq (searchTerm) {
    searchTerm = searchTerm.replace(/\s+/g, "+");
    console.log(searchTerm);
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