import map from 'lodash/collection/pluck';
import { entitiesSelector, entitiesReducer } from '@ftbl/entities';
import { RESOURCE } from '@ftbl/resource';
import { Schema, normalize, arrayOf } from 'normalizr';

export const schema = new Schema('members');

export const FETCH = 'ftbl/timeline/players/FETCH';
export const SUCCESS = 'ftbl/timeline/players/SUCCESS';
export const FAILED = 'ftbl/timeline/players/FAILED';

export default entitiesReducer([ FETCH, SUCCESS, FAILED ]);

export const playersSelector = entitiesSelector(state => state.timeline.players, 'members', 'name');

export function fetch(team) {
  return {
    [RESOURCE]: {
      types: [ FETCH, SUCCESS, FAILED ]
    , payload: {
        url: `/members/${team.id}/connections`
      , method: 'get'
      , query: { type: 'plays-for' }
      , normalize: r => {
          return normalize(map(r.connections, 'member'), arrayOf(schema));
        }
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