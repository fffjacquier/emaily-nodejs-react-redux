import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

const SurveyForm = ({ handleSubmit, onSurveySubmit }) => {
  const renderFields = () => {
    return (
      <div>
        {formFields.map(({ label, name }) => (
          <Field key={name} type="text" name={name} label={label} component={SurveyField} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>SurveyForm</h1>
      <div>
        <form onSubmit={handleSubmit(onSurveySubmit)}>
          {renderFields()}
          <Link to="/surveys" className="btn-flat red white-text">
            Cancel
          </Link>
          <button className="btn-flat teal right white-text" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    </div>
  );
};

function validate(values) {
  const errors = {};

  errors.emails = validateEmails(values.emails || '');

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a value`;
    }
  });

  return errors;
}

export default reduxForm({
  form: 'surveyForm',
  validate,
  destroyOnUnmount: false
})(SurveyForm);
