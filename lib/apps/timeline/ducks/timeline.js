import { entitiesSelector, entitiesReducer } from '@ftbl/entities';
import { RESOURCE } from '@ftbl/resource';
import { Schema, normalize, arrayOf } from 'normalizr';

export const schema = new Schema('posts');

export const FETCH = 'ftbl/timeline/timeline/FETCH';
export const SUCCESS = 'ftbl/timeline/timeline/SUCCESS';
export const FAILED = 'ftbl/timeline/timeline/FAILED';

export default entitiesReducer([ FETCH, SUCCESS, FAILED ]);

export const timelineSelector = entitiesSelector(state => state.timeline.timeline, 'posts');

export function fetch(member) {
  return {
    [RESOURCE]: {
      types: [ FETCH, SUCCESS, FAILED ]
    , payload: {
        url: '/feed/mentions'
      , method: 'get'
      , query: { memberid: member.id, limit: 100 }
      , normalize: r => normalize(r.posts, arrayOf(schema))
      }
    , meta: { member }
    }
  };
};

export function list(member) {
  return (dispatch, getState) => {
    const state = timelineSelector(getState());

    if (state.fetched || !member) return;

    return dispatch(fetch(member));
  }
};