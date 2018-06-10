import { compose } from 'recompose';
import SecurePage from './secureWrapper';
import pageWrapper from './pageWrapper';

export default (i18nextNamespaces = ['common']) =>
  compose(
    pageWrapper(i18nextNamespaces),
    SecurePage,
);

