import { Action, Dispatch } from 'redux';
import Todo from '../../common/Todo';

export class TodoState {
  readonly title: string = '';
  readonly todos: Todo[] = [];
  readonly loading: boolean = false;
}

export const SET_TITLE = 'boilerplate/Todo/SET_TITLE';
export const SAVE_TODO_SUCCESS = 'boilerplate/Todo/SAVE_TODO_SUCCESS';
export const SET_DONE_SUCCESS = 'boilerplate/Todo/SET_DONE_SUCCESS';

export const dispatchSetTitle = (dispatch: Dispatch, title: string) =>
  dispatch({
    type: SET_TITLE,
    payload: title,
  });

export const dispatchSaveTodoSuccess = (dispatch: Dispatch) =>
  dispatch({
    type: SAVE_TODO_SUCCESS,
  });

  export const dispatchSetDoneSuccess = (dispatch: Dispatch, i: number) =>
  dispatch({
    type: SET_DONE_SUCCESS,
    payload: i,
  });

const TodoReducer = (state: TodoState = new TodoState(), action): TodoState => {
  switch (action.type) {
    case SET_TITLE:
      return { ...state, title: action.payload };
    case SAVE_TODO_SUCCESS:
      return {
        ...state,
        title: '',
        todos: state.todos.concat(
          new Todo(state.todos.length + 1, state.title),
        ),
        loading: false,
      };
    case SET_DONE_SUCCESS:
      return {
        ...state,
        todos: state.todos.map(
          t => (t.id === action.payload ? t.setDone() : t),
        ),
        loading: false,
      };
    default:
      return state;
  }
};

export default TodoReducer;
