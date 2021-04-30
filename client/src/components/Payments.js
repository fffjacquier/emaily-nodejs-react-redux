import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

class Payments extends Component {
  render() {
    return (
      <div>
        <StripeCheckout
          amount={500}
          currency="USD"
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          token={(token) => {
            console.log('token', token, this.props);
            this.props.handleToken(token);
          }}
          name="Emaily App"
          description="$5 for 5 email credits"
        >
          <button className="btn">Add Credits</button>
        </StripeCheckout>
      </div>
    );
  }
}

export default connect(null, actions)(Payments);
