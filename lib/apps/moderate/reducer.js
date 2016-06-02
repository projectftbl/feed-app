import { combineReducers } from 'redux'; 
import feed from './ducks/feed';  
import feedback from './ducks/feedback';  

export default combineReducers({
  feed
, feedback
});