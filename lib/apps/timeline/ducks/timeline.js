import assign from 'lodash/object/assign';
import { entitiesSelector, entitiesReducer } from '@ftbl/entities';
import { RESOURCE } from '@ftbl/resource';
import { SIGN_OUT_SUCCESS } from '@ftbl/session-web';
import { Schema, normalize, arrayOf } from 'normalizr';

export const schema = new Schema('posts');

export const FETCH = 'ftbl/timeline/timeline/FETCH';
export const SUCCESS = 'ftbl/timeline/timeline/SUCCESS';
export const FAILED = 'ftbl/timeline/timeline/FAILED';

export const MORE = 'ftbl/timeline/timeline/MORE';

const LIMIT = 10;

export const initialState = { 
  fetching: false
, fetched: false
, data: []
, meta: { 
    query: { 
      limit: LIMIT 
    }
  }
, error: null 
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH:
    return assign({}, state, { fetching: true, fetched: false, error: null });
  case SUCCESS:
    const data = action.meta.reset ? action.payload.result : state.data.concat(action.payload.result);
    return assign({}, state, { fetching: false, fetched: true, data, meta: action.meta || state.meta });
  case FAILED:
    return assign({}, state, { fetching: false, error: action.payload.statusText });

  case MORE:
    const meta = assign({}, state.meta, { continuation: action.payload.continuation });
    return assign({}, state, { fetching: true, meta });
  
  case SIGN_OUT_SUCCESS:
    return initialState;
  
  default:
    return state;
  }
};

export const timelineSelector = entitiesSelector(state => state.timeline.timeline, 'posts', 'createdAt:desc');

export function more() {
  return (dispatch, getState) => {
    const { meta } = getState().timeline.timeline
        , continuation = meta.continuation;

    dispatch({ type: MORE, payload: { continuation }});

    return dispatch(fetch(meta.member, continuation));
  }
};

export function fetch(member = {}, continuation = {}, limit = LIMIT) {
  const { id, seq } = continuation;

  return {
    [RESOURCE]: {
      types: [ FETCH, SUCCESS, FAILED ]
    , payload: {
        url: '/feed/mentions'
      , method: 'get'
      , query: { memberid: member.id, continuationid: id, continuationseq: seq, limit, sort: 'createdAt', dir: 'desc' }
      , normalize: r => normalize(r.posts, arrayOf(schema))
      }
    , meta: { member, limit, reset: continuation.id == null }
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
