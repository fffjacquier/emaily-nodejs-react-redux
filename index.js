const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');
// first the models (used in passport)
require('./models/User');
require('./services/passport');

mongoose.connect(keys.MONGODB_URI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT;
app.listen(PORT);

/*
// process killings
process.once('SIGUSR2', function () {
  process.kill(process.pid, 'SIGUSR2');
});
process.on('SIGINT', function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, 'SIGINT');
});
*/
