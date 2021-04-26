const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');
// first the models (used in passport)
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.MONGODB_URI);

const app = express();

app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveysRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // handle static or assets files
  app.use(express.static('client/build'));

  // handle react routes within index.html file
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

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
