const app = require('./app').app;
const https = require('https');
const config = process.env.NODE_ENV == 'production' ? require('./config/config_prod.js') : require('./config/config_dev.js');

//Listening
app.listen(config.port, '192.168.0.16');
//https.createServer(config.sslOptions, app).listen(config.HTTPSPort);