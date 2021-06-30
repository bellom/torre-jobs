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
// import rootReducer from './reducers';


const store = createStore(applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/homepage" exact component={HomePage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

