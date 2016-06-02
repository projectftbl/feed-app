import React from 'react';
import { Route } from 'react-router';
import { Timeline } from './handlers';

export default function(Authorize) {
  return (
    <Route path='timeline' component={Authorize()(Timeline)} />
  );
};