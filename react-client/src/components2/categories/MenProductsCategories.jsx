import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBIcon, MDBTooltip, MDBBadge, MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBBtn } from "mdbreact";
import { BrowserRouter as Router, Switch, Route, Link, hashHistory } from "react-router-dom";


class MenProductsCategories extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <section className="text-center my-5">
          <h1>All Men products categories </h1>
          <MDBRow>
          {
            this.props.maleTags.map((element, index)=> (
              <MDBCol lg="2" md="0" className="mb-lg-0 mb-4" key={index}>
                <MDBCard cascade narrow ecommerce>
                  <Link to={element.tagLink}>
                    <MDBCardImage
                      cascade
                      src={element.tagImage}
                      top
                      alt="sample photo"
                      overlay="white-slight"
                    />
                    <MDBCardBody cascade className="text-center">
                      <MDBCardTitle>
                        <strong>{element.tagName}</strong>
                      </MDBCardTitle>
                    </MDBCardBody>
                  </Link>
                </MDBCard>
              </MDBCol>
            ))
          }
          </MDBRow>
        </section>
      </div>
    )
  }
}

export default MenProductsCategories;