const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userService = require('../services/userService');
const config = require('../config/config');


let options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : config.secret
}

passport.use(new JWTStrategy(options, function(jwt_payload, done) {

            //note: add jwt blacklist parser

    userService.getById(jwt_payload.userId)
    .then( (user) => {
        if(!user)
            return done(null, false);

        return done(null, user);
    })
    .catch( (error) => {
        return done(error, false);
    });
})
);

module.exports = passport;