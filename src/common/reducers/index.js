import { combineReducers } from 'redux';
import playerReducer from './player'
import accessReducer from './access'
import searchReducer from './search'

const rootReducer = combineReducers({
  player: playerReducer,
  access: accessReducer,
  search: searchReducer
});

export default rootReducer;
