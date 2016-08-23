import { entitiesSelector, entitiesReducer } from '@ftbl/entities';
import { RESOURCE } from '@ftbl/resource';
import { Schema, normalize, arrayOf } from 'normalizr';

export const schema = new Schema('members');

export const FETCH = 'ftbl/timeline/players/FETCH';
export const SUCCESS = 'ftbl/timeline/players/SUCCESS';
export const FAILED = 'ftbl/timeline/players/FAILED';

export default entitiesReducer([ FETCH, SUCCESS, FAILED ]);

export const playersSelector = entitiesSelector(state => state.timeline.players, 'members');

export function fetch(team) {
  return {
    [RESOURCE]: {
      types: [ FETCH, SUCCESS, FAILED ]
    , payload: {
        url: '/members'
      , method: 'get'
      , query: { type: 'player', parent: team.id }
      , normalize: r => normalize(r.members, arrayOf(schema))
      }
    }
  };
};

export function list(team) {
  return (dispatch, getState) => {
    const state = teamsSelector(getState());

    if (state.fetched || !team) return;

    return dispatch(fetch(team));
  }
};