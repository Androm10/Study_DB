const passport = require('../passport/passport');

module.exports = passport.authenticate('jwt', {session: false})