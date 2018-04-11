import React from 'react';
import ReactDOM from 'react-dom';

import NumberWithCommas from '../src';

it('renders when given non-numerical input', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NumberWithCommas value="r" />, div);
  ReactDOM.render(<NumberWithCommas value={undefined} />, div);
});
