import { Action, Dispatch } from 'redux';
import User from '../../common/User';

export class AuthorizeState {
  readonly user: User = undefined;
}

const AuthorizeReducer = (
  state: AuthorizeState = new AuthorizeState(),
  action,
): AuthorizeState => {
  return state;
};

export default AuthorizeReducer;
