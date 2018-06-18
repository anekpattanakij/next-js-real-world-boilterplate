import React from 'react';
import Link from 'next/link';
import * as i18n from 'i18next';

import PureComponent from '../src/components/PureComponent';
import ExtendedComponent from '../src/components/ExtendedComponent';
import ComponentWithTrans from '../src/components/ComponentWithTrans';

import pageWrapper from '../src/hoc/pageWrapper';

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
