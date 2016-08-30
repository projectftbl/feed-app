import React from 'react';
import { Heading, Message } from '@ftbl/component';
import Post from './post';
import Filter from './filter';

export const More = ({ more, timeline }) => {
  const styles = {
    base: {
      display: 'block'
    , border: '1px solid rgba(0,0,0,.15)'
    , borderRadius: 3
    , padding: 10
    , marginTop: 20
    , marginBottom: 20
    , textAlign: 'center'
    , cursor: 'pointer'
    , clear: 'both'
    }
  };

  const message = timeline.fetching ? 'Loading....' : 'Load more';

  return <a style={styles.base} onClick={more}>{message}</a>;
};

export default ({ member, timeline, teams, players, more, send }) => {
  if (member == null) return <div />;

  return (
    <div>
      <Filter teams={teams} players={players} />
      
      {timeline.data.length === 0 && timeline.fetched && <Message message='No posts' />}
      {timeline.error && <Message message='Error retrieving posts' colour='#db2828' />}

      {timeline.data.map(post => <Post key={post.id} post={post} member={member} send={send} />)}

      {timeline.meta.continuation && <More more={more} timeline={timeline} />}
    </div>
  );
};
