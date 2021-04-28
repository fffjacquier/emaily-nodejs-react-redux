import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  form: reduxForm,
});
