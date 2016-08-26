import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { memberSelector } from '@ftbl/member-web';
import { timelineSelector, fetch, more } from '../ducks/timeline';
import { teamsSelector, list as listTeams, select as selectTeam } from '../ducks/teams';
import { playersSelector, list as listPlayers } from '../ducks/players';
import { Timeline } from '../components';
import { send } from '../../moderate/ducks/feedback';

export class Handler extends Component {

  componentDidMount() {
    const { fetch, listTeams } = this.props;
    
    fetch();
    listTeams();
  }

  render() {
    return <Timeline {...this.props} />;
  }
};

const mapStateToProps = state => {
  return {
    member: memberSelector(state)
  , timeline: timelineSelector(state)
  , teams: teamsSelector(state)
  , players: playersSelector(state)
  };
};

export default connect(mapStateToProps, { fetch, listTeams, selectTeam, more, send })(Handler);
