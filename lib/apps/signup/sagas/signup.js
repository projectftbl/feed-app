import { take, put } from 'redux-saga/effects';
import { reset } from 'redux-form';
import { push } from 'react-router-redux';

import { SUCCESS } from '../ducks/signup';

export function* register() {
  while(true) {
    yield take(SUCCESS);
    yield put(reset('signup'));
  }
};
