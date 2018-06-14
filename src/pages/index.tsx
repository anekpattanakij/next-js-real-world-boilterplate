import React from 'react';
import {connect} from 'react-redux';

import {loadData, startClock, tickClock} from '../redux-saga/actions';
import Counter from '../components/counter';

interface IProps {
    ctx:any;
    dispatch:any;
  }

  
class Index extends React.Component<IProps> {

  render () {
    return ( 
        <Counter />
    );
  }
}

export default connect()(Index);
