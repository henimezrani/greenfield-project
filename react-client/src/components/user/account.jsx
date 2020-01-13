import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import SignUp from './signup.jsx';
import Login from './login.jsx';
import $ from 'jquery';
import { Redirect } from 'react-router-dom'

// This component is rendered whenever the user is not logged in through the user button in the navbar. Upon login or register, the function passed as props takes the data of the logged user so that it can be passed to the main component since it is passed to both the login and register forms
class Account extends React.Component {
  constructor(props) {
    super(props);
    //this is not needed, but it's here in case you want to use it
    this.state = {
      userData: {
        userId: ""
      }
    };
  }

  render() {
    return (
      <MDBContainer>
      {
          (this.props.userData.name === "") ? (
              <MDBRow>
                <SignUp setUserData={this.props.setUserData} />
                <Login setUserData={this.props.setUserData} />
              </MDBRow>
          ) : <Redirect to='/' />
        }
      </MDBContainer>
    );
  }
}

export default Account;