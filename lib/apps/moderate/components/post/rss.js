import React from 'react';

const Heading = ({ children }) => {
  const styles = {
    base: {
      fontWeight: 700
    , fontSize: '1.1em'
    }
  };

  return <div style={styles.base}>{children}</div>;
}

export default ({ post, member }) => {
  return (
    <div>
      <Heading>{post.title}</Heading>
      <div dangerouslySetInnerHTML={{__html: post.text}} />
    </div>
  );
};