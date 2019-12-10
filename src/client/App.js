import './app.css';

import React, { Component } from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { DMMapPage } from './pages/DMMapPage';
import { PlayerMapPage } from './pages/PlayerMapPage';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div style={{ height: '100%' }}>
                    <Switch>
                        <Route exact path='/'>
                            <HomePage />
                        </Route>
                        <Route exact path='/dm/:dmId'>
                            <DMMapPage />
                        </Route>
                        <Route exact path='/player/:playerId'>
                            <PlayerMapPage />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}