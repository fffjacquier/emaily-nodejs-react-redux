const mongoose = require('mongoose');
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

/*const uniqBy = (arr, predicate) => {
  const cb = typeof predicate === 'function' ? predicate : (o) => o[predicate];

  return [
    ...arr
      .reduce((map, item) => {
        const key = item === null || item === undefined ? item : cb(item);

        map.has(key) || map.set(key, item);

        return map;
      }, new Map())
      .values()
  ];
};*/

module.exports = (app) => {
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for your feedback!');
  });

  // receive feedback from users that clicked on link in the survey
  app.post('/api/surveys/webhooks', (req, res) => {
    // console.log(req.body);
    const p = new Path('/api/surveys/:surveyId/:choice');

    // extract path from url using lodash
    _.chain(req.body)
      .map(({ url, email }) => {
        // extract email + surveyId and choice from url
        const match = p.test(new URL(url).pathname);
        // match can be null or an object with surveyId and choice
        if (match) return { email, ...match };
      })
      // remove records without surveyId and choice
      .compact()
      // remove records with duplicate email and surveyId
      .uniqBy('email', 'surveyId')
      /* [{
        email: 'any@mail.com',
        surveyId: '608bd2f6eb8e4918c46ac3cb',
        choice: 'yes'
      }] */
      .each(({ email, surveyId, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: {
                email: email,
                responded: false
              }
            }
          },
          {
            $inc: { [choice]: 1 },
            // The '$' below matches the one found in $elemMatch above
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

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
      dateSent: Date.now()
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
