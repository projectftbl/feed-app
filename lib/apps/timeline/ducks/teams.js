import { entitiesSelector, entitiesReducer } from '@ftbl/entities';
import { RESOURCE } from '@ftbl/resource';
import { Schema, normalize, arrayOf } from 'normalizr';

export const schema = new Schema('members');

export const FETCH = 'ftbl/timeline/teams/FETCH';
export const SUCCESS = 'ftbl/timeline/teams/SUCCESS';
export const FAILED = 'ftbl/timeline/teams/FAILED';

export default entitiesReducer([ FETCH, SUCCESS, FAILED ]);

export const teamsSelector = entitiesSelector(state => state.timeline.teams, 'members', 'name');

export function fetch() {
  return {
    [RESOURCE]: {
      types: [ FETCH, SUCCESS, FAILED ]
    , payload: {
        url: '/members'
      , method: 'get'
      , query: { type: 'team' }
      , normalize: r => normalize(r.members, arrayOf(schema))
      }
    }
  };
};

export function list() {
  return (dispatch, getState) => {
    const state = teamsSelector(getState());

    if (state.fetched) return;

    return dispatch(fetch());
  }
};
