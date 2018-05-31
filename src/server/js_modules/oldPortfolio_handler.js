

module.exports = function(app) {
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
 }

