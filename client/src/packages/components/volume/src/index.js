import React from 'react';

import NumberWithCommas from 'number-with-commas';

const Volume24h = ({
  symbol,
  value,
}) => (
  <div>
    <span>{symbol}</span>
    <span>
      &nbsp;<NumberWithCommas value={value.toFixed(0)} />
    </span>
  </div>
)