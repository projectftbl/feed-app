import { take, put } from 'redux-saga/effects';

import { actionTypes } from 'redux-form';

import { fetch } from '../ducks/timeline';

export function* teamSelected() {
  while(true) {
    const action = yield take(actionTypes.CHANGE);

    if (action.form === 'filter-timeline' && action.field === 'team') {
      yield put(fetch({ id: action.value }));
    }
  }
};
