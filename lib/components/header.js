import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import { Ball } from '@ftbl/icons';
import { Desktop, Mobile } from './navigation';

@Radium
export default class Header extends Component {
  render() {
    const styles = {
      base: {
        position: 'relative'
      , padding: '5px 20px 5px 20px'
      , '@media (min-width: 1024px)': {
          padding: '5px 30px 10px 30px'
        }
      }
    };

    return (
      <div style={styles.base}>        
        <Link to='/timeline' style={{textDecoration: 'none', color: '#333'}}>
          <img src='/feed.png' style={{height:36, paddingTop:2}} />
        </Link>

        <Desktop {...this.props} />
        <Mobile {...this.props} />
      </div>
    );
  }
};
