const config= require('./config');
const Auth0Strategy =require('passport-auth0');

module.exports = new Auth0Strategy({
    domain: config.domain,
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: '/login'
},

function (accessToken, refreshToken, extraParams, profile, done) {
    console.log(1);
    return done (null, profile);
}

);

