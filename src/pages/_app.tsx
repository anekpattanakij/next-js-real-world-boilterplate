import App, {Container} from 'next/app';
import React from 'react';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import ConfigStore from '../redux/store';

import withReduxSaga from 'next-redux-saga';
import createSagaStore from '../redux-saga/store';

class MyApp extends App  {

  render () {
    const {Component, pageProps, store} = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(createSagaStore)(withReduxSaga(MyApp));
