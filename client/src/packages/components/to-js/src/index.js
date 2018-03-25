/**
 * Higher-order component which takes a component and 
 * processes its props. If any prop is an Immutable.js
 * data type (isImmutable), .toJS() is called 
 * on the prop to turn it into a plain-old JS object. 
 * 
 * This higher-order component allows Immutable
 * data to be accessed in container components while
 * keeping dummy/presentational components unaware
 * of Immutable.js usage.
 */

import React from 'react'
import { isImmutable } from 'immutable'

const toJS = WrappedComponent => wrappedComponentProps => {

  // Each 2-element array produced by Object.entries()
  // has the property name (KEY) stored in index 0
  // and value (VALUE) stored in index 1.
  const KEY = 0
  const VALUE = 1

  // Convert wrappedComponentProps key:value object into
  // an array of 2-element arrays.
  let propsJS = Object.entries(wrappedComponentProps);
  
  // Reduce this array of 2-element arrays to a plain JS
  // key:value object of props to pass to WrappedComponent
  propsJS = propsJS.reduce((newProps, wrappedComponentProp) => {

    // get current key:value pair to check
    const newPropKey = wrappedComponentProp[KEY];
    const newPropValue = wrappedComponentProp[VALUE];

    // if the newPropValue is an Immutable.js data structure,
    // convert it to plain JS by calling toJS() before assigning
    // to newProps[newPropKey], otherwise assign newPropValue
    // without any modifications.
    newProps[newPropKey] = isImmutable(
      newPropValue
    ) ? newPropValue.toJS() : newPropValue;

    return newProps
  }, {})

  return <WrappedComponent {...propsJS} />
}

export default toJS;