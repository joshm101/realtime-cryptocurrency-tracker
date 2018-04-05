import { connect } from 'react-redux';

import { actions } from 'coins-actions';
import CoinList from './CoinList';

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinList);
