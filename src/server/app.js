//NPM and Node Modules
const express = require('express');
const path = require('path');
const sass = require('node-sass-middleware');

//Config
const config = process.env.NODE_ENV == 'production' ? require('./config/config_prod.js') : require('./config/config_dev.js');

//Init of express app
const app = express();

//Static middleware
app.use(express.static(path.join(__dirname, '../../views')));
/* app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('There was an error on the server');
}); */

///Route handlers

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