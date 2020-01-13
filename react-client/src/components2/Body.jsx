import React from "react";
import {
  MDBContainer,
  MDBRow
} from "mdbreact";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  hashHistory
} from "react-router-dom";
import HomeCarousel from "./body-components/homeCarousel.jsx"

const Body = props => {
  return (
    <div>
      <section className="text-center my-5">
        <MDBRow>
          <HomeCarousel categoryName="/store/men" categoryImage="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/8.jpg" />
          <HomeCarousel categoryName="/store/women" categoryImage="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/9.jpg" />
        </MDBRow>
      </section>
    </div>
  );
};

export default Body;
