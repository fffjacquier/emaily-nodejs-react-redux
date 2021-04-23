const keys = require('../config/keys');
const stripe = require('stripe')(keys.STRIPE_SECRET_KEY);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    //console.log('BoDY req', req.body, req.user);

    const { id } = req.body;
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 credits',
      source: id,
    });

    console.log(charge);
    req.user.credits += 5;

    const user = await req.user.save();
    console.log(user);

    res.send(user);
  });
};
