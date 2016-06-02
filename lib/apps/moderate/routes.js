import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Moderate, Member, Feed } from './handlers';

export default function(Authorize) {
  return (
    <Route path='moderate' component={Authorize()(Moderate)}>
      <Route path=':id' component={Member}>
        <IndexRoute component={Feed} />
        <Route path='feed' component={Feed} />
      </Route>
    </Route>
  );
};