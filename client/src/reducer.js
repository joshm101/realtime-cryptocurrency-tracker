import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';

import { reducer as coinsReducer } from 'coins-reducer';
import { reducer as currencyPairConnectionsReducer } 
  from 'currency-pair-connections-reducer';
import { reducer as currencyPairReducer }
  from 'currency-pair-reducer';

const rootReducer = combineReducers({
  coinsReducer,
  currencyPairConnectionsReducer,
  currencyPairReducer,
});

export default rootReducer;