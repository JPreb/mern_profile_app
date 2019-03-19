import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/userActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Logout extends Component {
  static propTypes = {
    logoutUser: PropTypes.func.isRequired
  };

  render() {
    return (
      <Fragment>
        <NavLink onClick={this.props.logoutUser} tag={Link} to="/">
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { logoutUser }
)(Logout);
