import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddProduct from "./AddProduct.jsx";

const Home = props => {
  return (
    <div>
      <AddProduct />
    </div>
  );
};

export default Home;
