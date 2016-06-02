import map from 'lodash/collection/map';
import React from 'react';
import Feedback from './feedback';

export default ({ types, ...rest }) => {
  const styles = {
    base: {
      paddingTop: 10
    , paddingBottom: 10
    }
  };
  
  return (
    <div style={styles.base}>
      {map(types, (text, type) =>
        <Feedback key={type} {...rest} type={type}>{text}</Feedback>
      )}
    </div>
  );
};