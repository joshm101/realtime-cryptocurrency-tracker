import { connect } from 'react-redux';

import { actions } from 'coins-actions';
import CoinList from 'coin-list';

const mapStateToProps = (state, ownProps) => {
  return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCoinList: () => {
      dispatch(actions.getCoinList());
    }
  }
}

const CoinListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinList);

export default CoinListContainer;
