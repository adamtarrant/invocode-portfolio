const fs = require('fs');

module.exports= {
    port: process.env.PORT,
    randomQuoteApiKey: process.env.RQ_API_KEY,
    emailAuth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASS
    },
}