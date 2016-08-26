import React, { Component, PropTypes } from 'react';
import Radium, { StyleRoot } from 'radium';
import { connect } from 'react-redux';
import { Flash, close } from 'frieze';
import { Header, Navigation } from '../components';
import { components } from '@ftbl/user-web';
import { memberSelector } from '@ftbl/member-web';
import { signOut, resend } from '@ftbl/session-web';

const Email = components.EmailNag
    , Password = components.PasswordNag;

const Wrapper = Radium(({ children }) => {
  const styles = {
    base: {
      backgroundColor: '#fff'
    , margin: '0 auto'
    , width: 1024
    , height: '100%'
    , '@media (max-width: 1023px)': {
        width: 640
      }
    , '@media (max-width: 639px)': {
        margin: 0
      , width: '100%'
      }
    }
  };

  return <div style={styles.base}>{children}</div>;
});

@Radium
export class Main extends Component {

  static propTypes = {
    flash: PropTypes.object.isRequired
  } 

  render() {
    const { children, session, member, signOut, flash, close, resend } = this.props;

    const styles = {
      base: {
        width: '100%'
      , height: '100%'
      , overflow: 'auto'
      , paddingTop: 20
      , paddingBottom: 40
      , paddingLeft: 20
      , paddingRight: 20
      , '@media (max-width: 639px)': {
          paddingTop: 0
        }
      }
    };

    return (
      <StyleRoot style={{width: '100%', height: '100%', backgroundColor: 'rgb(52,52,52)'}}>      
        <Wrapper>
          <Flash flash={flash} onClose={close}/>
          <Header session={session} member={member} onSignOut={signOut} />
          
          <Email condition={session.user && session.user.verificationCode} 
                 onResend={() => resend(session.user.email)} />
          <Password condition={session.user && session.user.shouldChangePassword} />

          <div style={styles.base}>
            {children}
          </div>
        </Wrapper>
      </StyleRoot>
    );
  }
}

export default connect(state => ({ 
  session: state.session
, member: memberSelector(state)
, flash: state.flash 
}), { signOut, close, resend })(Main);
