import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { memberSelector } from '../ducks/member';
import { feedSelector, list } from '../ducks/feed';
import { send } from '../ducks/feedback';
import { Feed } from '../components';

export class Handler extends Component {

  componentDidUpdate() {
    const { member, list } = this.props;
    if (member) list(member);
  }

  render() {
    return <Feed {...this.props} />;
  }
};

const mapStateToProps = (state, props) => {
  return {
    member: memberSelector(state, props)
  , feed: feedSelector(state, props)
  };
};

export default connect(mapStateToProps, { list, send })(Handler);
