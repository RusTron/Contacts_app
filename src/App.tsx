import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LayoutBase } from './layouts';
import { Contacts } from './pages/Contacts';
import { Home } from './pages/Home';
import './App.scss';

const App = () => {
  return (
    <LayoutBase>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path="/contacts" component={Contacts}/>
      </Switch>
    </LayoutBase>
  );
};

export default App;
