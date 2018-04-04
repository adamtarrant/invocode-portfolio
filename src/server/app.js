//NPM and Node Modules
const express = require('express');
const path = require('path');

//Config
const config = process.env.NODE_ENV == 'production' ? require('./config/config_prod.js') : require('./config/config_dev.js');

//Init of express app
const app = express();

//Set view engine
app.set('view engine', 'ejs');

//Static middleware
app.use(express.static(path.join(__dirname, '../../public')));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('There was an error on the server');
});


///Route handlers

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