import { take, put } from 'redux-saga/effects';

import { fetch, FEEDBACK_SUCCESS } from '../ducks/feedback';
import { SUCCESS as FEED_SUCCESS } from '../ducks/feed';

export function* sent() {
  while(true) {
    const { meta } = yield take(FEEDBACK_SUCCESS);

    yield put(fetch(meta.post, meta.member))
  }
};

export function* feed() {
  while(true) {
    const { payload, meta } = yield take(FEED_SUCCESS);

    yield put(fetch(payload.result, meta.member));
  }
};

