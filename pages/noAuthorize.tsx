import React from 'react';
import Helmet from 'react-helmet';

export default () => (
  <main className="index">
    <Helmet title={`No Authorize Page!`} meta={[{ property: 'og:title' }]} />
    You do not have authorize to access this page
  </main>
);
