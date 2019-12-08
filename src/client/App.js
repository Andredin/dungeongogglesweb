import './app.css';

import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import { Home } from './Home';
import { Map } from './Map';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/test">
              <Home />
            </Route>
            <Route path="/dm/:dmId">
              <Map />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}