import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';

import { reducer as coinsReducer } from 'coins-reducer';

const rootReducer = combineReducers({
  coinsReducer
});

export default rootReducer;