import React, { useState } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';

// Should display either SurveyForm or SurveyFormReview
const SurveyNew = () => {
  const [showReview, setShowReview] = useState(false);
  // const [clearForm, setClearForm] = useState(false);

  const renderContent = () => {
    if (showReview) {
      return <SurveyReview onCancel={() => setShowReview(false)} />;
    }
    return <SurveyForm onSurveySubmit={() => setShowReview(true)} />;
  };

  return <div>{renderContent()}</div>;
};

// this is the way to clear out the form
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
