import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Todo from '../src/common/Todo';
import TodoComponent from '../src/components/TodoComponent';
import Button from '../src/components/Button';
import Loader from '../src/components/Loader';
import {
  dispatchSetTitle,
  dispatchSaveTodoSuccess,
  dispatchSetDoneSuccess,
} from '../src/redux/module/TodoReducer';
import { State } from '../src/redux/reducer';
import pageWrapper from '../src/hoc/pageWrapper';
import withI18next from '../src/hoc/withI18next';

export interface ITodoState {
  title: string;
  todos: Todo[];
  loading: boolean;
}

export interface ITodoDispatch {
  setTitle(n: string): void;
  saveTodo(): void;
  setDone(i: number): void;
}

export type ITodoProps = ITodoState & ITodoDispatch;

const TodoView: React.StatelessComponent<ITodoProps> = ({
  title,
  todos,
  loading,
  setTitle,
  saveTodo,
  setDone,
}) => (
  <main className="index">
    {loading && <Loader />}
    <h1 className="index__header">Todo app</h1>
    <form className="index__form" onSubmit={e => e.preventDefault()}>
      <label className="index__form__label" htmlFor="newtodo">
        Add a new todo:
      </label>
      <input
        className="index__form__input"
        name="newtodo"
        type="text"
        autoFocus
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Button click={saveTodo} text="Add" />
    </form>
    <br />
    <section className="index__todo-container">
      {todos.map(t => <TodoComponent todo={t} setDone={setDone} key={t.id} />)}
    </section>
  </main>
);

const stateToProps = (state: State): ITodoState => ({
  title: state.todos.title,
  todos: state.todos.todos,
  loading: state.todos.loading,
});

const dispatchToProps = (dispatch: Dispatch): ITodoDispatch => ({
  setTitle(n: string) {
    dispatchSetTitle(dispatch, n);
  },
  saveTodo(): void {
    dispatchSaveTodoSuccess(dispatch);
  },
  setDone(i: number) {
    dispatchSetDoneSuccess(dispatch, i);
  },
});
//setTitle, saveTodo, setDone
export default pageWrapper(['common'])(
  connect(
    stateToProps,
    dispatchToProps,
  )(TodoView),
);
