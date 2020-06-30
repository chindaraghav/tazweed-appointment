import {combineReducers} from 'redux';
import sellers from './sellers.reducer';
import app from './app.reducer';

export default combineReducers({
  sellers,
  app,
});
