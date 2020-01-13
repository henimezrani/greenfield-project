import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddProduct from "./AddProduct.jsx";

//we render the add product comp as first display to the admin to add product
const Home = props => {
  return (
    <div>
      <AddProduct />
    </div>
  );
};

export default Home;
