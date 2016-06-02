import assign from 'lodash/object/assign';
import map from 'lodash/collection/map';
import compact from 'lodash/array/compact';
import { createSelector } from 'reselect';
import { RESOURCE } from '@ftbl/resource';
import { Schema, normalize, arrayOf } from 'normalizr';
import { SIGN_OUT_SUCCESS } from '@ftbl/session-web';

export const schema = new Schema('posts');

export const FETCH = 'ftbl/moderate/feed/FETCH';
export const SUCCESS = 'ftbl/moderate/feed/SUCCESS';
export const FAILED = 'ftbl/moderate/feed/FAILED';

const byMember = (state, props) => state.moderate.feed[props.params.id];

const initialState = { fetching: false, fetched: false, error: null, data: [] };

export const feedSelector = createSelector(
  [ byMember, state => state.entities ], (data, entities) => {
  if (data == null) return initialState;
  return assign({}, data, { data: compact(map(data.data, id => entities.posts && entities.posts[id])) });
});

export default (state = {}, action) => {
  switch (action.type) {
  case FETCH:
    return assign({}, state, { [action.meta.member]: { fetching: true, fetched: false, error: null }});
  case SUCCESS:
    return assign({}, state, { [action.meta.member]: { fetching: false, fetched: true, error: null, data: action.payload.result }});
  case FAILED:
    return assign({}, state, { [action.meta.member]: { fetching: false, fetched: false, error: action.payload.statusText }});
  
  case SIGN_OUT_SUCCESS:
    return {};
  
  default:
    return state;
  }
};

export function fetch(member) {
  return {
    [RESOURCE]: {
      types: [ FETCH, SUCCESS, FAILED ]
    , payload: {
        url: '/feed'
      , method: 'get'
      , query: { memberid: member.id, limit: 100 }
      , normalize: r => normalize(r.posts, arrayOf(schema))
      }
    , meta: { member: member.id }
    }
  };
};

export function list(member) {
  return (dispatch, getState) => {
    const { feed } = getState().moderate;

    if (feed[member.id] && (feed[member.id].fetched || feed[member.id].fetching)) return;

    return dispatch(fetch(member));
  }
};

