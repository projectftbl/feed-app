import React from 'react';
import { Heading, Message } from '@ftbl/component';
import Post from './post';

export default ({ member, feed, send }) => {
  if (member == null) return <div/>;

  if (feed.data.length === 0 && feed.fetched) return <Message message='No posts' />;
  if (feed.error) return <Message message='Error retrieving posts' colour='#db2828' />;

  return (
    <div>
      {feed.data.map(post => <Post key={post.id} post={post} send={send} member={member} />)}
    </div>
  );
};
