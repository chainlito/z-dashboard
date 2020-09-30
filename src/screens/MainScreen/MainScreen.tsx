import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
    FarmComposition,
    StatsComposition,
    Pool1Composition,
    Pool2Composition,
} from 'compositions';

import 'assets/scss/index.scss';

class MainScreen extends Component {
    public render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={FarmComposition} />
                    <Route path='/farm-y' exact={true} component={Pool1Composition} />
                    <Route path='/farm-lp' exact={true} component={Pool2Composition} />
                    <Route path='/stats' exact={true} component={StatsComposition} />
                </Switch>
            </Router>
        );
    }
}

export default MainScreen;