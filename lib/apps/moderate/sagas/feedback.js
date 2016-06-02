import { take, put } from 'redux-saga/effects';

import { fetch, FEEDBACK_SUCCESS } from '../ducks/feedback';
import { SUCCESS as FEED_SUCCESS } from '../ducks/feed';

export function* sent() {
  while(true) {
    const { meta } = yield take(FEEDBACK_SUCCESS);

    yield put(fetch(meta.post))
  }
};

export function* feed() {
  while(true) {
    const { payload } = yield take(FEED_SUCCESS);

    yield put(fetch(payload.result));
  }
};
