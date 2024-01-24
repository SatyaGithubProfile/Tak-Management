const jwt = require('jsonwebtoken');
const config = require('config');


function auth(req, res, next) {

    // token existed or not?
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No Token is provided!');

    // verify the token

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        console.log('decoded--->', decoded, req.user)
        req.user = decoded;
        next();
    }
    catch (e) {
        res.status(401).send('Invalid Token!')
    }

}

module.exports = auth;