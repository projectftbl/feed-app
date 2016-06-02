import { createSelector } from 'reselect';

export const memberSelector = createSelector(
  [ (_, props) => props.params.id, state => state.entities ]
, (id, entities) => entities.members && entities.members[id]);
