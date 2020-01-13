import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const SideBar = props => {
  return (
    <div className="ui grid">
      <div className="four wide column">
        <div className="ui secondary vertical pointing fluid menu">
          <a className="item">Home</a>
          <a className="item">Messages</a>
          <a className="item active">Friends</a>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
