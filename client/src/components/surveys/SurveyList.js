import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { fetchSurveys } from '../../actions/actions';

const SurveyList = ({ surveys, fetchSurveys }) => {
  useEffect(() => {
    fetchSurveys();
  }, [fetchSurveys]);

  const renderSurveys = () => {
    return surveys.reverse().map((survey) => {
      return (
        <div key={survey._id} className="card darken-1">
          <div class="card-content">
            <span class="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">Sent on: {new Date(survey.dateSent).toLocaleDateString()}</p>
          </div>
          <div class="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <h1>Surveys List</h1>
      <div>{renderSurveys()}</div>
    </div>
  );
};

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
