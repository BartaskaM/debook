import React from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import LoginTabs from './LoginTabs';
import MainTabs from './MainTabs';
import Profile from './Profile';
import DeviceDetails from './DeviceDetails';
import OfficeDetails from './OfficeDetails';

class MainContainer extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <hr/>
        <Route path='/login' component={LoginTabs}/>
        <Route path='/main' component={MainTabs}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/device/:id' component={DeviceDetails}/>
        <Route path='/office/:id' component={OfficeDetails}/>
      </div>
    );
  }
}

export default MainContainer;