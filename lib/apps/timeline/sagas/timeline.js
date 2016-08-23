import { take, put } from 'redux-saga/effects';

import { actionTypes } from 'redux-form';

import { fetch } from '../ducks/timeline';
import { fetch as fetchPlayers } from '../ducks/players';

export function* selected() {
  while(true) {
    const action = yield take(actionTypes.CHANGE);

    if (action.form === 'filter-timeline') {
      if (action.field === 'team') {
        yield put(fetchPlayers({ id: action.value }));
      }

      if (action.field === 'team' || action.field === 'player') {
        yield put(fetch({ id: action.value }));
      }
    }
  }
};
