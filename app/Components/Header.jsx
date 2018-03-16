import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <ul>
        <li><Link to='/login'>LoginTabs</Link></li>
        <li><Link to='/main'>MainTabs</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
        <li><Link to='/devices/1'>Device id 1</Link></li>
        <li><Link to='/offices/1'>Office id 1</Link></li>
      </ul>
    );
  }
}

export default Header;