
module.exports = function(app) {
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
}

