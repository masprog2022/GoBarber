import React from 'react';

import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';

export const Router: React.FC = () => (
  <BrowserRouter>
     <Switch>
       <Route path="/" exact component={SignIn} />
       <Route path="/signup" component={SignUp} />
       <Route path="/dashboard" component={Dashboard} isPrivate/>
     </Switch>
  </BrowserRouter>
)
