import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import LandingPage from './containers/LandingPage';
import HomePage from './containers/HomePage';
import JobPage from './containers/JobPage';



ReactDOM.render(
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/user/:username" exact component={HomePage} />
        <Route path="/job/:jobId" exact component={JobPage} />
      </Switch>
    </Router>,
  document.getElementById('root')
);

