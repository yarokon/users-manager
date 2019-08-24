import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Root from './Root';
import UserList from './UserList';
import User from './User';
import NotFound from './NotFound';

function App() {
  return (
    <Root>
      <Switch>
        <Route exact path="/" component={UserList} />
        <Route exact path="/user/:id?" component={User} />
        <Route component={NotFound} />
      </Switch>
    </Root>
  );
}

export default App;
