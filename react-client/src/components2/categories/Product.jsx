import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  hashHistory
} from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBIcon,
  MDBTooltip,
  MDBBadge,
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBBtn
} from "mdbreact";

const Product = () => {
  return (
    <MDBCol lg="3" md="6" className="mb-lg-0 mb-4">
      <Link to="/men/category/ProductID">
        <MDBCard className="align-items-center">
          <MDBCardImage
            src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12.jpg"
            top
            alt="sample photo"
            overlay="white-slight"
          />
          <MDBCardBody className="text-center">

              <h5>Shirt</h5>
              {/* name to rendere  */}

            <h5>
              <strong>
                  Denim shirt{" "}
                  <MDBBadge pill color="danger">
                    NEW {/* change on state new best discount */}
                  </MDBBadge>
              </strong>
            </h5>
            <h4 className="font-weight-bold blue-text">
              <strong>120$</strong> {/* price to rendere  */}
            </h4>
          </MDBCardBody>
        </MDBCard>
      </Link>
    </MDBCol>
  );
};
export default Product;
