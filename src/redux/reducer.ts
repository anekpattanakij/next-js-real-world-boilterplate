import { combineReducers } from 'redux';
import TodoReducer, { TodoState } from './module/TodoReducer';

const reducer = combineReducers<State>({
    todos: TodoReducer,
});

export class State {
    readonly todos: TodoState = new TodoState();
}


export default reducer;
