import find from 'lodash/collection/find';
import React from 'react';
import Radium from 'radium';

export default Radium(props => {
  const { send, post, type, member, children, feedbacks } = props;

  const styles = {
    base: {
      paddingRight: 10
    , cursor: 'pointer'
    }
  , active: {
      fontWeight: 700
    }
  };

  const active = find(feedbacks.data, { type });

  return (
    <span style={[ styles.base, active && styles.active ]} onClick={_ => send(post, type, member)}>
      {children}
    </span>
  );
});