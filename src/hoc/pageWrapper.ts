import { compose } from 'recompose';
import configureStore from '../redux/store';
import withI18next from './withI18next';

export default (i18nextNamespaces = ['common']) =>
  compose(
    withI18next(i18nextNamespaces),
);

