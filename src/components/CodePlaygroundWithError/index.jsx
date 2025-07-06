

import React from 'react';
import CodePlayground from '@site/src/components/CodePlayground';

export default function CodePlaygroundWithError({ js }) {
  if (js.includes('boom')) throw new Error('Simulated CodePlayground error');
  return <CodePlayground js={js} />;
}