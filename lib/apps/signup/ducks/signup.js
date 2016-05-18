import assign from 'lodash/object/assign';
import { RESOURCE } from '@ftbl/resource';

export const SIGNUP = 'ftbl/signup/signup/SIGNUP';
export const SUCCESS = 'ftbl/signup/signup/SUCCESS';
export const FAILED = 'ftbl/signup/signup/FAILED';

const initialState = { 
  signingUp: false
, user: null
, data: null
, error: null
};

const ERRORS = {
  422: 'Validation error'
, 500: 'Server error'
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case SIGNUP:
    return assign({}, state, { signingUp: true, error: null, user: null, data: null });
  case SUCCESS:
    return assign({}, state, { user: action.payload.user, data: action.meta.data, signingUp: false });
  case FAILED:
    return assign({}, state, { error: ERRORS[action.payload.status], user: null, data: null, signingUp: false });

  default:
    return state;
  }
};

export function signUp(data) {
  data.confirm = data.password;

  return {
    [RESOURCE]: {
      types: [ SIGNUP, SUCCESS, FAILED ]
    , payload: {
        url: '/users', method: 'post', data: { user: data }
      }
    , meta: { data }
    }
  };
};
