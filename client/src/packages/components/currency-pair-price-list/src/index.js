import { connect } from 'react-redux';

import toJS from 'to-js';

import CurrencyPairPriceList from './CurrencyPairPriceList.component';

const mapStateToProps = state => ({
  trackedPairs: state.get('currencyPairReducer'),
});

export default connect(
  mapStateToProps
)(toJS(CurrencyPairPriceList));