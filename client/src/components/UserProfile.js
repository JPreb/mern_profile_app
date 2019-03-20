import React, { Component } from 'react';
import { connect } from 'react-redux';

export class UserProfile extends Component {
  render() {
    const { firstName, lastName, email } = this.props.user.user;
    return (
      <div>
        <h1>Your Profile</h1>
        <h4>{`First Name: ${firstName}`}</h4>
        <h4>{`Last Name: ${lastName}`}</h4>
        <h4>{`Email: ${email}`}</h4>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(UserProfile);
