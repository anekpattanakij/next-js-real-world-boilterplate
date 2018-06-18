import React, {Component} from 'react';
import {connect} from 'react-redux';
interface IProps {
  staticData:any;
}

class ExamplePage extends Component<IProps> {
  static async getInitialProps({store}) {
    store.dispatch({type: 'SOME_ASYNC_ACTION_REQUEST'});
    return {staticData: 'Hello world!'};
  }

  render() {
    return <div>{this.props.staticData}</div>;
  }
}

export default connect(state => state)(ExamplePage);
