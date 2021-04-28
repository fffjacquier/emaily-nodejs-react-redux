const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for your feedback!');
  });

  // receive feedback from users that clicked on link in the survey
  //app.post('/api/surveys/webhooks', (req, res) => {});

  // create a survey and send out a big email to recipients
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    // recipients should be an array of objects containing objects with email prop and email address
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map((email) => ({ email })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // 1. create and send email
    // -- needs an email template
    // --- for the link yes / no, use a link like
    // emaily.com/surveys/feedback/123/no
    // we cannot put identifying token in the mail because every one will get the same link
    // to identify users: we'll use sendgrid
    // for each user, sendgrid check links, and they replace link with custom sendgrid server link
    // -- and pass all recipients to an mail generator
    // -- send this mailer to an email provider taht will do the mail stuff
    // 2. is email sent ok?
    // 3. if yes, save the survey
    // 4. remove a credit from user's credits

    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (error) {
      console.error(error);
      // something wrong with data
      res.status(422).send(error);
    }
  });
};
