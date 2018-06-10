import { combineReducers } from 'redux';
import TodoReducer, { TodoState } from './module/TodoReducer';
import AuthorizeReducer, { AuthorizeState } from './module/AuthorizeReducer';

const reducer = combineReducers<State>({
  todos: TodoReducer,
  loggedOnUser: AuthorizeReducer,
});

export class State {
  readonly todos: TodoState = new TodoState();
  readonly loggedOnUser: AuthorizeState = new AuthorizeState();
}

export default reducer;
