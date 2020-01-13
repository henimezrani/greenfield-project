import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import ProductDetails from "../categories/ProductDetails.jsx";

const RouterComponent = (props) => {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  console.log(props.match)
  // console.log(props.match.params.param2)

  return (
    // (param.split('/').length === 1 ) ? (
      <div>hi</div>
    // ) : (
      // <ProductDetails />
    // )
  );
}

export default RouterComponent