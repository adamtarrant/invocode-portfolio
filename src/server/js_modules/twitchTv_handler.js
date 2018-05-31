const config = process.env.NODE_ENV == 'production' ? require('../config/config_prod.js') : require('../config/config_dev.js');
const https = require('https');

module.exports = function(app) {
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
}