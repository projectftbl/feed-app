import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import qs from 'querystring';
import { connect } from 'react-redux';
import { membersSelector, search } from '@ftbl/members-web';
import { Heading } from '@ftbl/component';
import Members from '../components/members';

import { components } from '@ftbl/members-web';

const Search = components.Search;

const Children = Radium(({ children }) => {
  const styles = {
    base: {
      marginLeft: '50%'
    , paddingLeft: 20
    , paddingBottom: 20
    , height: '100%'
    , position: 'relative'
    , '@media (max-width: 639px)': {
        marginLeft: 0
      , paddingLeft: 0
      }
    , '@media (min-width: 1024px)': {
        paddingLeft: 30
      , paddingRight: 10
      }
    }
  };

  return <div style={styles.base}>{children}</div>
});

@Radium
export class Moderate extends Component {
  componentWillMount() {
    const { members, search, location } = this.props;
    if (members.meta.query.q == null) search(qs.parse(location.search.substr(1)));
  }

  render() {
    const { children } = this.props;

    const styles = {
      base: {
        width: '50%'
      , left: 0
      , position: 'absolute'
      , paddingLeft: 20
      , paddingRight: 20
      , borderRight: '1px solid #eee'
      , height: '100%'

      , '@media (max-width: 639px)': {
          position: 'relative'
        , width: '100%'
        , borderRight: 0
        , borderBottom: '1px solid #eee'
        , paddingBottom: 20
        , marginBottom: 20
        , paddingLeft: 0
        }
      , '@media (min-width: 1024px)': {
          paddingLeft: 30
        , paddingRight: 30
        }
      }
    };

    return (
      <span>
        <div style={styles.base}>
          <Heading>Moderate Content</Heading>
          <Search />
          <Members {...this.props} />
        </div>
        <Children>{children}</Children>
      </span>
    );
  }
};

const mapStateToProps = state => ({ members: membersSelector(state) });

export default connect(mapStateToProps, { search })(Moderate);
