import React from 'react';
import Radium from 'radium';
import { Menu } from '@ftbl/navigation';
import definition from './menu';

export default Radium(props => {
  const { main, user } = definition(props);

  const styles = {
    base: {
      '@media (max-width: 639px)': {
        display: 'none'
      }
    }
  , main: {
      position: 'absolute'
    , top: 11
    , paddingLeft: 20
    }
  , user: {
      position: 'absolute'
    , top: 11
    , right: 20
    , '@media (min-width: 1024px)': {
        right: 30
      }
    }
  };

  return (
    <span style={styles.base}>
      <span style={styles.main}>
        <Menu items={main} />
      </span>

      <div style={styles.user}>
        <Menu items={user} />
      </div>
    </span>
  );
});