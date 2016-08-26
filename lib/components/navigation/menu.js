import React from 'react';
import { Menu, User } from '@ftbl/icons';

export default ({ session, member: { name = '', id } = {}, onSignOut }) => {
  const main = [ 
    { name: 'admin', Icon: Menu, claim: 'read member' 
    , submenu: [ 
        { to: '/moderate', title: 'Moderate Content' } 
      , { to: '/aggregation', title: 'Manage Aggregations' } 
      ]
    }
  ];

  const user = [
    { to: '/signup', title: 'Sign Up', authenticated: false }
  , { to: '/signon', title: 'Sign On', authenticated: false }

  , { name: 'member', title: `${name}`, align: 'right', indexLink: false, authenticated: true, claim: 'read member'
    , submenu: [
        { to: '/member', title: `Edit ${name}`, indexLink: true, authenticated: true }
      , { to: '/member/connect', title: 'Connect Accounts', indexLink: true, authenticated: true }
      , { to: '/member/connections', title: 'Manage Connections', indexLink: true, authenticated: true }
      ]
    }
  , { name: 'user', align: 'right', Icon: User, indexLink: false, authenticated: true
    , submenu: [
        { to: '/user', title: 'Edit Settings', authenticated: true }
      , { to: '/user/password', title: 'Change Password', authenticated: true }
      , { divider: true }
      , { title: 'Sign Out', onClick: _ => onSignOut(session.user.id), active: false, authenticated: true }
      ]
    }
  ];

  return { main, user };
};