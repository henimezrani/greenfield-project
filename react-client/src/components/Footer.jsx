import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { BrowserRouter } from 'react-router-dom';
import { MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import { MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import $ from 'jquery';

// this component renders the footer in all the routes of the project. It contains information about the business as well as a small form for inquiries if a user wants to ask something directly to the business owner.
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inquiry_email: "",
      inquiry_message: ""
    }
  }

  handleClick(event) {
    event.preventDefault();
    var data = {
      email: this.state.inquiry_email,
      message: this.state.inquiry_message
    }
    var that = this
    $.post('/api/add/inquiry', data, (result)=> {
      that.setState({
        inquiry_email: "",
        inquiry_message: ""
      })
    })
  }

  typing(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  render() {
    return (
      <MDBFooter color="grey" className="font-small pt-4 mt-4">
        <BrowserRouter>
            <MDBNav className="justify-content-center">
              <MDBNavItem>
                <MDBNavLink active to="#!"><i className="fab fa-facebook-f"></i></MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#!"><i className="fab fa-twitter"></i></MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#!"><i className="fab fa-instagram"></i></MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#!"><i className="fab fa-youtube"></i></MDBNavLink>
              </MDBNavItem>
            </MDBNav>
          </BrowserRouter>
        <MDBContainer fluid className="text-center text-md-left">
          <MDBRow>
            <MDBCol md="4">
              <h3 className="title">Green Ghost Store</h3>
              <br></br>
              <h5>
                Finest online shopping store you can ever see in your entire life! Feel free to approach our team for any inquiry.
              </h5>
              <br></br>
            </MDBCol>
            <MDBCol md="8">
              <form>
                <MDBRow>
                  <MDBCol md="8">
                    <div className="white-text">

                      <MDBInput id="inquiry_email" label="Your email" icon="envelope" group type="email" validate error="wrong" success="right" value={this.state.inquiry_email} onChange={this.typing.bind(this)} />

                      <MDBInput id="inquiry_message" label="Your message" icon="lock" group type="textarea" validate value={this.state.inquiry_message} onChange={this.typing.bind(this)} />

                    </div>
                  </MDBCol>
                  <MDBCol md="4">
                    <div className="text-center py-4 mt-3">
                      <MDBBtn color="white" type="submit" onClick={this.handleClick.bind(this)} > Send </MDBBtn>
                    </div>
                  </MDBCol>
                </MDBRow>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="footer-copyright text-center py-3">
          <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright: <a href="#"> GeekGhost </a>
          </MDBContainer>
        </div>
      </MDBFooter>
    );
  }
}

export default Footer;