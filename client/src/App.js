import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import WelcomePage from './components/WelcomePage';
import UserProfile from './components/UserProfile';
import PrivateRoute from './components/PrivateRoute';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/userActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <Switch>
              <Container>
                <Route exact path="/" component={WelcomePage} />
                <PrivateRoute path="/userProfile" component={UserProfile} />
              </Container>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
