
module.exports = function(app) {
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
 }
