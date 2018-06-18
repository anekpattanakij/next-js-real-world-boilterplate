import { Component } from 'react';
import { connect } from 'react-redux';
import User from '../common/User';
import { State } from '../redux/reducer';
import NoAuthorizePage from '../../pages/noAuthorize';

interface IWithAuthProps {
  loggedOnUser: User;
}

export default <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  class VerifyAuth extends Component<IWithAuthProps> {
    render() {
      const { loggedOnUser, ...props } = this.props as IWithAuthProps;
      return loggedOnUser && loggedOnUser.cif ? (
        <WrappedComponent {...this.props} {...this.state} />
      ) : (
        <NoAuthorizePage />
      );
    }
  }
  const stateToProps = (state: State): IWithAuthProps => ({
    loggedOnUser: state.loggedOnUser.user,
  });
  return connect(stateToProps)(VerifyAuth);
};
