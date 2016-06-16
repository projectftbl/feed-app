import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { memberSelector } from '@ftbl/member-web';
import { timelineSelector, list } from '../ducks/timeline';
import { Timeline } from '../components';
import { send } from '../../moderate/ducks/feedback';

export class Handler extends Component {

  componentDidMount() {
    const { member, list } = this.props;
    if (member) list(member);
  }

  componentDidUpdate(props) {
    const { member, list } = this.props;
    if (member && !props.member) list(member);
  }

  render() {
    return <Timeline {...this.props} />;
  }
};

const mapStateToProps = state => {
  return {
    member: memberSelector(state)
  , timeline: timelineSelector(state)
  };
};

export default connect(mapStateToProps, { list, send })(Handler);
