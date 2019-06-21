import { combineReducers } from 'redux';
import crustReducer from '~/reducers/crust';

const rootReducer = combineReducers({
  crustState: crustReducer
});

export default rootReducer;