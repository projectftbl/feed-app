import React from 'react';
import Radium from 'radium';
import { FromNow } from '@ftbl/component';

const Heading = ({ post }) => {
  const styles = {
    base: {
      fontWeight: 700
    , fontSize: '1.1em'
    , paddingBottom: 10
    }
  };

  return (
    <div style={styles.base}>
      <a href={post.url} target='_blank'>{post.title}</a>
    </div>
  );
};

const Image = Radium(({ post }) => {
  const styles = {
    base: {
      float: 'left'
    , width: 200
    , '@media (max-width: 639px)': {
        float: 'none'
      }
    }
  };

  const image = (post.image == null) ? '/placeholder.png' : post.image;

  return (
    <a href={post.url} target='_blank'>
      <img style={styles.base} src={image} />
    </a>
  );
});

const Text = ({ post }) => {
  const styles = {
    base: {
      paddingBottom: 10
    }
  };

  return <div style={styles.base} dangerouslySetInnerHTML={{__html: post.summary || post.text}} />
};

const Content = ({ children }) => {
  const styles = {
    base: {
      marginLeft: 210
    , '@media (max-width: 639px)': {
        marginLeft: 0
      }
    }
  };

  return <div style={styles.base}>{children}</div>
};

const Footer = ({ post }) => {
  const styles = {
    base: {
      fontSize: '0.9em'
    }
  };

  return (
    <div style={styles.base}>
      <span style={{fontWeight: 700, paddingRight: 10, borderRight: '1px solid #333', marginRight: 10}}>
        {post.data.blog}
      </span>
      <FromNow date={new Date(post.createdAt)} />
    </div>
  );
};

export default ({ post, member }) => {
  const styles = {
    base: {
      clear: 'both'
    , paddingTop: 20
    }
  };

  return (
    <div style={styles.base}>
      <Image post={post} />
      <Content>
        <Heading post={post} />
        <Text post={post} />
        <Footer post={post} />
      </Content>
    </div>
  );
};