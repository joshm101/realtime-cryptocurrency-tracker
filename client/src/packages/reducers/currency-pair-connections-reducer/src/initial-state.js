import Immutable from 'immutable';

const createInitialState = () => Immutable.fromJS({
  connections: {},
});

export default createInitialState;