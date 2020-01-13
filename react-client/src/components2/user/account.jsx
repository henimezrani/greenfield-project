import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import SignUp from './signup.jsx';
import Login from './login.jsx';
import $ from 'jquery';
import { Redirect } from 'react-router-dom'

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        userId: ""
      }
    };
  }

  componentDidMount() {
    // $.ajax({
    //   url: '/someroute',
    //   success: (data) => {
    //     this.setState({
    //       someState: data
    //     })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
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