import React from 'react';
import Modal from 'react-modal';
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

export const Dialog = ({ isOpen }) => {
  const styles = {
    overlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }
  , content: {
      backgroundColor: 'transparent'
    , top: '31%'
    , left: '50%'
    , right: 'auto'
    , bottom: 'auto'
    , marginRight: '-50%'
    , transform: 'translate(-50%, -50%)'    
    , padding: '10px 20px 20px 20px'
    , borderRadius: 0
    , borderColor: 'transparent'
    }
  , message: {
      color: '#000'
    , fontSize: '1.2em'
    }
  };

  return (
    <Modal style={styles} isOpen={isOpen} closeTimeoutMS={150}>
      <div style={styles.message}>Searching...</div>
    </Modal>
  );
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

      <Dialog isOpen={timeline.fetching} />
    </div>
  );
};
