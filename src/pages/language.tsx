import React from 'react';
import Link from 'next/link';
import * as i18n from 'i18next';

import PureComponent from '../components/PureComponent';
import ExtendedComponent from '../components/ExtendedComponent';
import ComponentWithTrans from '../components/ComponentWithTrans';

import pageWrapper from '../hoc/pageWrapper';

export default pageWrapper(['home', 'common'])(({ t }) => {
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('common:integrates_react-i18next')}</p>
      <PureComponent t={t} />
      <ExtendedComponent />
      <ComponentWithTrans />
      <Link href="/">
        <a>{t('link.gotoPage2')}</a>
      </Link>
    </div>
  );
});
