import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer, { State } from './reducer';

const configureStore = (initialState = State) =>
  createStore(
    rootReducer,
    undefined,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );

export default configureStore;
