import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import $ from 'jquery';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login_email: "",
      login_password: ""
    };
  }

  handleClick(event) {
    event.preventDefault();
    var data = {
      email: this.state.login_email,
      password: this.state.login_password
    };
    var that = this
    $.post("/api/user/login", data, function(res){
      console.log(res)
      let token = res.token
      window.localStorage.setItem('token',token);
      $.get(`/api/getUserById/${res.userId}`, function(response) {
        that.props.setUserData(response._id, response.name, response.email)
      })

    })

  }

  typing(event) {
    this.setState({[event.target.id]: event.target.value});
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
      <MDBCol md="6">
      <MDBCard>
        <h2 className="h2 text-center py-4">Already have an account?</h2>
        <MDBCardBody>
          <form>
            <p className="h4 text-center py-4">Log in</p>
            <div className="grey-text">

              <MDBInput id="login_email" label="Your email" icon="envelope" group type="email" validate error="wrong" success="right" value={this.state.login_email} onChange={this.typing.bind(this)} />

              <MDBInput id="login_password" label="Your password" icon="lock" group type="password" validate value={this.state.login_password} onChange={this.typing.bind(this)} />

            </div>
            <div className="text-center py-4 mt-3">
              <MDBBtn color="cyan" type="submit" onClick={this.handleClick.bind(this)} > Login </MDBBtn>
            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
    );
  }
}

export default Login;

