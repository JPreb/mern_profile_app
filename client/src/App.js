import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/userActions';

import Routes from './Routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Routes />
        </div>
      </Provider>
    );
  }
}

export default App;
