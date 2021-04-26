const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

module.exports = (app) => {
  //app.get('/api/surveys', (req, res) => {});

  // receive feedback from users that clicked on link in the survey
  //app.post('/api/surveys/webhooks', (req, res) => {});

  // create a survey
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;
  });
};
