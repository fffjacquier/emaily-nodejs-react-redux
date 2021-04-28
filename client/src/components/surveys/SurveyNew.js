import React, { Component } from 'react';
import SurveyForm from './SurveyForm';

// Should display either SurveyForm or SurveyFormReview
export default class SurveyNew extends Component {
  render() {
    return (
      <div>
        <SurveyForm />
      </div>
    );
  }
}
