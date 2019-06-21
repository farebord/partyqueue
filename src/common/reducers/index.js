import { combineReducers } from 'redux';
import playerReducer from './player'

const rootReducer = combineReducers({
  player: playerReducer
});

export default rootReducer;
