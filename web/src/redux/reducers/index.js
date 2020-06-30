import { combineReducers } from 'redux';
import appointments from './appointments.reducer';
import app from './app.reducer';

export default combineReducers({
    appointments,
    app
});
