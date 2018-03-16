import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <ul>
        <li><Link to='/login'>LoginTabs</Link></li>
        <li><Link to='/main'>MainTabs</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
        <li><Link to='/device/1'>Device with id 1</Link></li>
        <li><Link to='/office/1'>Office with id 1</Link></li>
      </ul>
    );
  }
}