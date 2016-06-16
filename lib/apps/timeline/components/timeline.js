import React from 'react';
import { Heading, Message } from '@ftbl/component';
import Post from './post';

export default ({ member, timeline, send }) => {
  if (member == null) return <div />;

  if (timeline.data.length === 0 && timeline.fetched) return <Message message='No posts' />;
  if (timeline.error) return <Message message='Error retrieving posts' colour='#db2828' />;

  return (
    <div>
      {timeline.data.length}
      {timeline.data.map(post => <Post key={post.id} post={post} member={member} send={send} />)}
    </div>
  );
};
