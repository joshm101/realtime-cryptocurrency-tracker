import React from 'react';

import NumberWithCommas from 'number-with-commas';

const Volume = ({
  symbol,
  value,
}) => (
  <div>
    {value && !isNaN(value) &&
      <div>
        <span>{symbol}</span>
        <span>
          &nbsp;<NumberWithCommas value={parseFloat(value).toFixed(0)} />
        </span>
      </div>
    }
  </div>
)

export default Volume;