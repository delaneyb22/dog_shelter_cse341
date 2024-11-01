const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./config');

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.jwtSecret,
}, (jwtPayload, done) => {
  // Verify the user here
  // For example, you can check if the user exists in your database
  // If the user is valid, return the user object
  // Otherwise, return null
  return done(null, jwtPayload.user);
}));