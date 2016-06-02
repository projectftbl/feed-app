import assign from 'lodash/object/assign';
import map from 'lodash/collection/map';
import reduce from 'lodash/collection/reduce';
import compact from 'lodash/array/compact';
import filter from 'lodash/collection/filter';
import isArray from 'lodash/lang/isArray';
import { createSelector } from 'reselect';
import { RESOURCE } from '@ftbl/resource';
import { Schema, normalize, arrayOf } from 'normalizr';
import { SIGN_OUT_SUCCESS } from '@ftbl/session-web';

export const schema = new Schema('feedbacks');

export const FEEDBACK = 'ftbl/moderate/feedback/FEEDBACK';
export const FEEDBACK_SUCCESS = 'ftbl/moderate/feedback/FEEDBACK_SUCCESS';
export const FEEDBACK_FAILED = 'ftbl/moderate/feedback/FEEDBACK_FAILED';

export const FETCH = 'ftbl/moderate/feedback/FETCH';
export const FETCH_SUCCESS = 'ftbl/moderate/feedback/FETCH_SUCCESS';
export const FETCH_FAILED = 'ftbl/moderate/feedback/FETCH_FAILED';

const initialState = { fetching: false, fetched: false, error: null, data: [] };

const byPost = (state, props) => state.moderate.feedback[props.post.id];

export const feedbacksSelector = createSelector(
  [ byPost, state => state.entities ], (data, entities) => {
  if (data == null) return initialState;

  return assign({}, data, { data: compact(map(data.data, id => entities.feedbacks && entities.feedbacks[id])) });
});

export default (state = {}, action) => {

  const merge = (ids, fn) => {
    return reduce(ids.map(id => fn(id)), (o, p) => {
      return assign(o, { [p.id]: p }); 
    }, {});
  };

  switch (action.type) {
  case FETCH:
    return assign({}, state, merge(action.meta.ids, id => {
      const data = state[id] && state[id].data;
      return { id, fetching: true, fetched: false, error: null, data };
    }));

  case FETCH_SUCCESS:
    return assign({}, state, merge(action.meta.ids, id => { 
      const data = map(filter(action.payload.entities.feedbacks, { contentId: id }), 'id');
      return { id, fetching: false, fetched: true, error: null, data };
    }));

  case FETCH_FAILED:
    return assign({}, state, merge(action.meta.ids, id => ({ id, fetching: false, fetched: false, error: action.payload.statusText })));

  case SIGN_OUT_SUCCESS:
    return {};
  
  default:
    return state;
  }
};

export function send(post, type, member) {
  return {
    [RESOURCE]: {
      types: [ FEEDBACK, FEEDBACK_SUCCESS, FEEDBACK_FAILED ]
    , payload: {
        url: '/feedbacks'
      , method: 'post'
      , data: { feedback: { contentId: post.id, type, memberId: member && member.id }}
      }
    , meta: { post: post.id, member }
    }
  };
};

export function fetch(ids, member) {
  if (isArray(ids) === false) ids = [ ids ];

  return {
    [RESOURCE]: {
      types: [ FETCH, FETCH_SUCCESS, FETCH_FAILED ]
    , payload: {
        url: '/feedbacks'
      , method: 'get'
      , query: { contentids: ids, memberid: member && member.id }
      , normalize: r => normalize(r.feedbacks, arrayOf(schema))
      }
    , meta: { ids }
    }
  };
};
