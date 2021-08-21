import { combineReducers } from 'redux';
import CountAReducer from './CounterAReducer';
import CountBReducer from './CounterBReducer';

const rootReducer = combineReducers({
  counterA: CountAReducer,
  counterB: CountBReducer,
});

export default rootReducer;
