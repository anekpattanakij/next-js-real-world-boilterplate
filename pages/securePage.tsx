import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../src/redux/reducer';
import securePageWrapper from '../src/hoc/securePageWrapper';

import Helmet from 'react-helmet';

interface IProps {
  t(x: string): string;
}

export interface ILandingSecureState {
  // Prepare some state
}

export type ITodoProps = IProps & ILandingSecureState;

const LandingSecureView: React.StatelessComponent<ITodoProps> = ({ t }) => (
  <div>
    <Helmet title={`Landing secure page!`} meta={[{ property: 'og:title' }]} />
    You have success full landing to secure page
  </div>
);

//setTitle, saveTodo, setDone
export default securePageWrapper(['common'])(LandingSecureView);
