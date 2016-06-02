import React from 'react';
import { Heading } from '@ftbl/component';
import Post from './post';

export default ({ member, timeline, send }) => {
  if (member == null) return <div/>;

  return (
    <div>
      {timeline.data.map(post => <Post key={post.id} post={post} member={member} send={send} />)}
    </div>
  );
};
