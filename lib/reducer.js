import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import { reducer as form } from 'redux-form';
import { reducer as local } from 'redux-react-local';
import { reducer as menu } from '@ftbl/navigation';
import { reducer as io } from '@ftbl/io';
import { reducer as session, signOnReducer as signon } from '@ftbl/session-web';
import { reducer as user } from '@ftbl/user-web';
import { reducer as signup } from '@ftbl/signup-web';
import { reducer as member } from '@ftbl/member-web';
import { reducer as members } from '@ftbl/members-web';
import { reducer as contact } from '@ftbl/contact-web';

import moderate from './apps/moderate/reducer';
import timeline from './apps/timeline/reducer';

import entities from '@ftbl/entities';
import flash from 'frieze';

export default combineReducers({
  routing: routerReducer
, form: form.plugin({ signon })
, local
, flash
, entities
, menu
, io

, ...session
, ...signup

, user
, member
, members
, contact
, moderate
, timeline
});