import React from 'react';
import { Heading, Message } from '@ftbl/component';
import Post from './post';
import Filter from './filter';

export const More = ({ more }) => {
  const styles = {
    base: {
      display: 'block'
    , border: '1px solid rgba(0,0,0,.15)'
    , borderRadius: 3
    , padding: 10
    , marginTop: 10
    , textAlign: 'center'
    , cursor: 'pointer'
    , clear: 'both'
    }
  };

  return <a style={styles.base} onClick={more}>Load more</a>;
};

export default ({ member, timeline, teams, players, more, send }) => {
  if (member == null) return <div />;

  return (
    <div>
      <Filter teams={teams} players={players} />
      
      {timeline.data.length === 0 && timeline.fetched && <Message message='No posts' />}
      {timeline.error && <Message message='Error retrieving posts' colour='#db2828' />}

      {timeline.data.map(post => <Post key={post.id} post={post} member={member} send={send} />)}

      <More more={more} />
    </div>
  );
};
