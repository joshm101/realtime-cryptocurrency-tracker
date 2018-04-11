import React from 'react';
import ReactDOM from 'react-dom';

import Volume from '../src';

it('renders when given invalid input', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Volume symbol="$" value={undefined} />, div);
  ReactDOM.render(<Volume symbol="$" value="r" />, div);
  ReactDOM.render(<Volume symbol="$" value="5" />, div);
});
