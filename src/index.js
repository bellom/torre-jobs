import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import HomePage from './containers/HomePage';
import JobPage from './containers/JobPage';
// import ProfilePage from './containers/ProfilePage';
// import rootReducer from './reducers';


const store = createStore(applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/user/:username" exact component={HomePage} />
        {/* <Route path="/profile/:username" exact component={ProfilePage} /> */}
        <Route path="/job/:jobId" exact component={JobPage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

