import React from 'react';
import { connect } from 'react-redux';
import { Rule } from '@ftbl/component';
import Feedbacks from '../feedbacks';
import { feedbacksSelector } from '../../ducks/feedback';
import { default as twitter } from './twitter';
import { default as rss } from './rss';

const posts = { twitter, rss };

const types = {
  promote: 'Promote'
, hide: 'Hide'
, neutral: 'Neutral'
};

const Post = ({ post, send, ...rest }) => {
  if (posts.hasOwnProperty(post.source) === false) return <span/>;
  const Post = posts[post.source];
  
  return (
    <div>
      <Post post={post} {...rest} />
      <Feedbacks post={post} send={send} {...rest} types={types} />
      <Rule />
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  feedbacks: feedbacksSelector(state, props)
});

export default connect(mapStateToProps)(Post);