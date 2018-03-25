import { connect } from 'react-redux';

import toJS from 'to-js';
import { actions } from 'currency-pair-tracking-actions';

import CurrencyPairPriceList from './CurrencyPairPriceList.component';

const mapStateToProps = state => ({
  trackedPairs: state.get('currencyPairReducer'),
});

const mapDispatchToProps = dispatch => ({
  startCurrencyPairTracking: (connectionPairs) => {
    dispatch(actions.openCurrencyPairTrackingConnection(connectionPairs));
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(CurrencyPairPriceList));