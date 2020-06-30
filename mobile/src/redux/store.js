import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  // middlewares.push(logger);
}

/**
 * Export the store holding state of whole application with thunk and logger middlewares.
 */
export default createStore(
  reducers,
  {},
  compose(applyMiddleware(...middlewares)),
);
