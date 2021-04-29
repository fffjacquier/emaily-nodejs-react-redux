import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../state/actions';

const SurveyReview = ({ onCancel, formValues, submitSurvey }) => {
  const reviewFields = formFields.map(({ name, label }) => (
    <div key={name}>
      <label>{label}</label>
      <div>{formValues[name]}</div>
    </div>
  ));

  return (
    <div>
      <h4>Please review your entries</h4>
      <div>{reviewFields}</div>
      <button className="yellow darken-2 white-text btn-flat" onClick={onCancel}>
        Back
      </button>
      <button className="green white-text btn-flat right" onClick={() => submitSurvey(formValues)}>
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  // state is the combinedReducer
  // so we got access to values in state.form.surveyForm.values
  // surveyForm coming from reduxForm() setup
  return {
    formValues: state.form.surveyForm.values
  };
};

export default connect(mapStateToProps, actions)(SurveyReview);
