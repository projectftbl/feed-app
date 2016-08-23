import { take, put } from 'redux-saga/effects';

import { fetch, FEEDBACK_SUCCESS } from '../../moderate/ducks/feedback';
import { SUCCESS as TIMELINE_SUCCESS } from '../ducks/timeline';

export function* sent() {
  while(true) {
    const { meta } = yield take(FEEDBACK_SUCCESS);

    yield put(fetch(meta.post, meta.member));
  }
};

export function* timeline() {
  while(true) {
    const { payload, meta } = yield take(TIMELINE_SUCCESS);

    // yield put(fetch(payload.result, meta.member));
  }
};
