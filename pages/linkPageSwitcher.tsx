import React from 'react';
import Link from 'next/link';

export default () => (
  <ul>
    <li><Link href="/c" as="/c"><a>a</a></Link></li>
    <li><Link href="/a" as="/a"><a>b</a></Link></li>
  </ul>
);
