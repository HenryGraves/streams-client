/**
 * @name GoogleAuth
 * @description logs a user in via OAuth2
 */
import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  authConfig = {
    clientId: '415023603444-lhcf7bsi5lds1jthpfpmf2u4eo60fkba.apps.googleusercontent.com',
    scope: 'email'
  }

  componentDidMount() {
    const { gapi } = window;
    gapi.load('client:auth2', () => {
      gapi.client.init(this.authConfig).then(() => {
        // after client init
        this.auth = gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get())
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  }

  _signIn = () => {
    this.auth.signIn();
  }

  _signOut = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return (
        <div>{null}</div>
      );
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this._signOut} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this._signIn} className="ui green google button">
          <i className="google icon" />
          Sign in with Google
        </button>
      );
    }
  }

  render () {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, {
  signIn,
  signOut
})(GoogleAuth);