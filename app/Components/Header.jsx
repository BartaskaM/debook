import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <ul>
        <li><Link to='/login'>LoginTabs</Link></li>
        <li><Link to='/main'>MainTabs</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
        <li><Link to='/device/'>Device</Link></li>
        <li><Link to='/office/'>Office</Link></li>
      </ul>
    );
  }
}

export default Header;