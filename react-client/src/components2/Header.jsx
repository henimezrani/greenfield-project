import React, { useState } from "react";
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  hashHistory
} from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";


class Header extends React.Component {
  constructor(props) {
    super(props);
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
      <nav className="navbar  navbar-expand-lg navbar-dark grey scrolling-navbar">
        <Link to="/" className="navbar-brand">
          <strong>GeekGhost</strong>
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link waves-effect waves-light">
                Home <span className="sr-only"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/store/women" className="nav-link waves-effect waves-light">
                Women
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/store/men" className="nav-link waves-effect waves-light">
                Men
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav nav-flex-icons">
            {
              (this.props.userData.name === "") ? (
                <li className="nav-item">
                  <Link to="/account" className="nav-link waves-effect waves-light">
                    <i className="fas fa-user-alt"></i>
                  </Link>
                </li>
              ) : (
                <Link to="/" className="navbar-brand">
                  <strong>Hey there, {this.props.userData.name}</strong>
                </Link>
              )
            }
            <li className="nav-item">
              <Link to="/cart" className="nav-link waves-effect waves-light">
                <i className="fas fa-cart-arrow-down"></i>
              </Link>
            </li>
            {
              (this.props.userData.name !== "") ? (
                <li className="nav-item">
                  <Link to="/" className="nav-link waves-effect waves-light" onClick={()=>this.props.resetUserState()}>
                    <i className="fas fa-sign-out-alt"></i>
                  </Link>
                </li>
              ) : null
            }
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;