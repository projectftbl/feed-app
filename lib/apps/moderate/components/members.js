import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import { Row, Cell, State, Events, Paging, Empty } from '@ftbl/table';
import { Message } from '@ftbl/component';

export const Linky = ({ member, location }) => {
  const styles = {
    base: {
      fontWeight: 400
    }
  , active: {
      fontWeight: 700
    }
  };

  return (
    <Link to={`/moderate/${member.id}${location.search}`} style={styles.base} activeStyle={styles.active}>
      {member.name}
    </Link>
  );
};

export const Member = State('member')(({ member, last, location, dispatch, $, state }) => {
  const events = Events({ dispatch, $, id: member.id })
      , highlight = state[member.id] ? '#666' : '#ccc';

  return (
    <Row onMouseOver={events.over} onMouseOut={events.out} last={last}>
      <Cell width='90%'>
        <Linky member={member} location={location} />
      </Cell>
      <Cell width='10%' align='right'><br/></Cell>
    </Row>
  );
});

export default ({ members, ...rest }) => {
  return (
    <div>
      {members.data.length === 0 && !members.fetching && <Message message='No members found' />}

      {members.data.map((member, i) => <Member key={member.id} member={member} {...rest} last={i === members.data.length-1} />)}

      <Empty limit={members.meta.query.limit} length={members.data.length} />

      {members.data.length > 0 && <Paging meta={members.meta} fetching={members.fetching} {...rest} entity='member' />}
    </div>
  );
};
