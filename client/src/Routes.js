import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from './components/routes/PrivateRoute';
import UserProfile from './components/UserProfile';
import WelcomePage from './components/WelcomePage';
import AppNavbar from './components/AppNavbar';
import { Container } from 'reactstrap';

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <AppNavbar />
          <Container>
            <Route exact path="/" component={WelcomePage} />
            <PrivateRoute
              exact
              path="/userProfile"
              component={UserProfile}
              isAuthenticated={this.props.isAuthenticated}
            />
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(Routes);
