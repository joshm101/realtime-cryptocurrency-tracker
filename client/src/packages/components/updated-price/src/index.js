/**
 * Displays a price change icon along with colored
 * price text based on changing price prop
 */

import React from 'react';
import ArrowDropUp from 'material-ui-icons/ArrowDropUp';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';

import NumberWithCommas from 'number-with-commas';

const PriceChangeEnum = Object.freeze({
  SAME: 0,
  UP: 1,
  DOWN: 2,
});
const GREEN = '#1b5e20';
const RED = '#d50000';
const BLACK = '#000';

class UpdatedPrice extends React.Component {
  state = {
    priceMovement: PriceChangeEnum.SAME,
  };

  componentWillUpdate(nextProps) {
    const currentProps = this.props;
    this.determinePriceMovement(
      currentProps.price,
      nextProps.price
    );
  }

  /**
   * Determines the price movement and sets state accordingly.
   * @param {number} currentValue - Currently displayed value
   * @param {number} nextValue - Value which will be displayed next
   * @return {void}
   */
  determinePriceMovement = (currentValue, nextValue) => {
    if (currentValue < nextValue) {
      this.setState({
        priceMovement: PriceChangeEnum.UP
      });
    }
    if (currentValue > nextValue) {
      this.setState({
        priceMovement: PriceChangeEnum.DOWN
      });
    }
  }

  /**
   * Determines the icon to display alongside the price
   * and returns it.
   * @return {JSX} Icon to display
   */
  getPriceChangeIcon = () => {
    const state = this.state;
    if (state.priceMovement === PriceChangeEnum.UP) {
      return <ArrowDropUp fontSize={48} />;
    }
    if (state.priceMovement === PriceChangeEnum.DOWN) {
      return <ArrowDropDown fontSize={48} />;
    }
  }

  /**
   * Determines the color to set the price to and
   * returns it
   * @return {string} Color hex value string
   */
  getPriceTextColor = () => {
    const state = this.state;
    if (state.priceMovement === PriceChangeEnum.UP) {
      return GREEN;
    }
    if (state.priceMovement === PriceChangeEnum.DOWN) {
      return RED;
    }
    return BLACK;
  }

  render() {
    const {
      toCurrencySymbol,
      price,
    } = this.props;
    const priceTextColor = this.getPriceTextColor();
    const priceChangeIcon = this.getPriceChangeIcon();
    return (
      <h1 style={{ color: priceTextColor }}>
        <span>{priceChangeIcon}</span> 
        <span>
          &nbsp;{`${toCurrencySymbol || '$'}`}
        </span> 
        <span>
          &nbsp;<NumberWithCommas value={price} />
        </span>
      </h1>
    );
  }
}

export default UpdatedPrice;