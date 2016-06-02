import React from 'react';
import { connect } from 'react-redux';
import { feedbacksSelector } from '../../moderate/ducks/feedback';
import { Feedbacks } from '../../moderate/components';
import { default as twitter } from '../../moderate/components/post/twitter';
import { default as rss } from '../../moderate/components/post/rss';

const posts = { twitter, rss };

const types = {
  like: 'Like'
, dislike: 'Dislike'
, love: 'Love'
};

const Post = ({ post, send, ...rest }) => {
  if (posts.hasOwnProperty(post.source) === false) return <span/>;
  const Post = posts[post.source];
  
  return (
    <div>
      <Post post={post} {...rest} />
      <Feedbacks post={post} send={send} {...rest} types={types} />
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  feedbacks: feedbacksSelector(state, props)
});

export default connect(mapStateToProps)(Post);