import React from 'react';

class NumberWithCommas extends React.Component {
  /**
   * https://goo.gl/XmxFfG
   * Takes a number and returns a string of that value
   * with commas in the correct places
   * @param {number} value - Value to format
   * @return {string} Number with commas in correct places
   */
  generateNumberWithCommas = (value) => {
    let parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  /**
   * https://goo.gl/GRoCsg
   * Returns the precision of given value param
   * @param {number} value - Number to get precision of
   * @return {number} Precision of provided value. 0 if
   * provided value is an integer
   */
  getNumberPrecision = (value) => { 
    if ((value % 1) != 0) 
      // given value is not an integer, get its
      // precision
      return value.toString().split(".")[1].length; 
    return 0;
  }

  /**
   * Generates a "display-ready" string for the given
   * value. "Display-ready" in this case means normalizing
   * the precision of a given value and adding commas
   * to the value.
   * @param {number} value - Number to make "display-ready"
   * @return {string} "display-ready" string
   */
  generateDisplayValue = (value) => {
    if (!value || isNaN(value)) {
      return '';
    }
    
    value = parseFloat(value);
    const precision = this.getNumberPrecision(value);
    if (precision === 1) {
      value = value.toFixed(2);
    }
    if (precision === 0) {
      value = value.toFixed(2);
    }

    return this.generateNumberWithCommas(value);
  }

  render() {
    const value = this.generateDisplayValue(this.props.value);
    return (
      <span>{value}</span>
    );
  }
}

export default NumberWithCommas;