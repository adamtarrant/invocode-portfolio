const fs = require('fs');
const path = require('path')

module.exports= {
    port: 3000,
    HTTPSPort: 443,
    sslOptions: {
        key: fs.readFileSync(path.join(__dirname, './key.pem')),
        cert: fs.readFileSync(path.join(__dirname, './cert.pem')),
        passphrase: "passphrase",
    }
}