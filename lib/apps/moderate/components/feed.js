import React from 'react';
import { Heading } from '@ftbl/component';
import Post from './post';

export default ({ member, feed, send }) => {
  if (member == null) return <div/>;

  return (
    <div>
      {feed.data.map(post => <Post key={post.id} post={post} send={send} />)}
    </div>
  );
};
