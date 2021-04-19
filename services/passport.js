const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // here user comes from mongo database
  // user.id is a shortcut for the _id object
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId).then((user) => {
    // this will add user to the request object on route handler
    // req -> cookie-session -> passport -> deserializeUser -> add user to to req object
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE_CLIENTID,
      clientSecret: keys.GOOGLE_CLIENTSECRET,
      callbackURL: '/auth/google/callback',
      proxy: true, // calculate cb url http or https correctly
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log('profile', profile.id);
      // do we already have this id in the db?
      User.findOne({
        googleId: profile.id,
      }).then((existingUser) => {
        if (!existingUser) {
          new User({
            googleId: profile.id,
          })
            .save()
            .then((user) => done(null, user));
        } else {
          done(null, existingUser);
        }
      });
      /*.catch((error) => {
          console.error(error.message);
          done();
        })*/
    }
  )
);
