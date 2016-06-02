import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { membersSelector, fetch } from '@ftbl/members-web';
import { memberSelector } from '../ducks/member';
import { Member } from '../components';

export class Handler extends Component {

  componentDidUpdate() {
    const { fetch, params, members, member } = this.props;

    if (members.fetched && !member) fetch(params.id);
  }

  render() {
    const { member = {}, children } = this.props;

    return (
      <div>
        <Member member={member} />
        {children}
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  return {
    member: memberSelector(state, props)
  , members: membersSelector(state)
  };
};

export default connect(mapStateToProps, { fetch })(Handler);
