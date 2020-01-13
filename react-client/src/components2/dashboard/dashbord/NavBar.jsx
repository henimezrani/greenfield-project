import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  hashHistory
} from "react-router-dom";

const NavBar = props => {
  return (
    <div className="ui container">
      <br />
      <div className="ui secondary menu">
        {/* logo  */}
        <div className="header item">Brand</div>

        <Link to="/dashboard">
          <div className="header item">Home</div>
        </Link>
        <Link to="/dashboard/allproducts">
          <div className="header item">All product</div>
        </Link>
        <Link to="/dashboard/menProducts">
          <div className="header item">Men products</div>
        </Link>
        <Link to="/dashboard/womenProducts">
          <div className="header item">Women products</div>
        </Link>
        <Link to="/dashboard/orders">
          <div className="header item">Orders</div>{" "}
        </Link>
        <div className="right menu">
          <a className="ui item">Logout</a>
        </div>
      </div>
      <div className="ui divider" />
      <br />
    </div>
  );
};

export default NavBar;
