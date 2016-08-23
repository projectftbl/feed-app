import { combineReducers } from 'redux'; 
import timeline from './ducks/timeline';  
import teams from './ducks/teams';  
import players from './ducks/players';  

export default combineReducers({
  timeline
, teams
, players
});