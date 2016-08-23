import React from 'react';
import { Heading, Message } from '@ftbl/component';
import Post from './post';
import Filter from './filter';

export default ({ member, timeline, teams, players, send }) => {
  if (member == null) return <div />;

  return (
    <div>
      <Filter teams={teams} players={players} />
      
      {timeline.data.length === 0 && timeline.fetched && <Message message='No posts' />}
      {timeline.error && <Message message='Error retrieving posts' colour='#db2828' />}

      {timeline.data.map(post => <Post key={post.id} post={post} member={member} send={send} />)}
    </div>
  );
};
