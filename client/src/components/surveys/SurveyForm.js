import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
  {
    'label': 'Survey Title',
    'name': 'title',
  },
  {
    'label': 'Subject Line',
    'name': 'subject',
  },
  {
    'label': 'Email Body',
    'name': 'body',
  },
  {
    'label': 'Recipient List',
    'name': 'emails',
  },
];

const SurveyForm = ({ handleSubmit }) => {
  const renderFields = () => {
    return (
      <div>
        {FIELDS.map(({ label, name }) => (
          <Field key={name} type="text" name={name} label={label} component={SurveyField} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>SurveyForm</h1>
      <div>
        <form onSubmit={handleSubmit(console.log)}>
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

  FIELDS.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a value`;
    }
  });

  return errors;
}

export default reduxForm({
  form: 'surveyForm',
  //initialValues: {},
  //onSubmit: (values) => {},
  validate,
})(SurveyForm);
