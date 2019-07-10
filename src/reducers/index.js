/**
 * @name reducers/index.js
 */
import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import streamReducer from './streamReducer';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxFormReducer,
  streams: streamReducer
});