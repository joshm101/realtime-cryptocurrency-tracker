import React from 'react';

import NumberWithCommas from 'number-with-commas';

const Change24h = ({
  symbol,
  changeAmount,
  changePercent,
}) => {
  let changeColor;
  if (changeAmount < 0) {
    changeColor = '#D50000';
  }
  if (changeAmount > 0) {
    changeColor = '#1B5E20';
  }
  if (changeAmount === 0) {
    changeColor = '#000';
  }
  const styles = {
    changeStyle: {
      color: changeColor,
    },
  };  
  return (
    <div>
      <span>{symbol}</span>
      <span>
        &nbsp;<NumberWithCommas value={changeAmount.toFixed(6)} />
      </span>
      <span>
        &nbsp;(
        <span style={styles.changeStyle}>
          {changePercent > 0 ? '+' : ''}{changePercent.toFixed(2)}%
        </span>
        )
      </span>
    </div>
  );
}

export default Change24h;