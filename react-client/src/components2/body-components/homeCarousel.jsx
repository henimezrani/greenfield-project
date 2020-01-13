import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBIcon, MDBTooltip, MDBBadge, MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBBtn } from "mdbreact";
import { BrowserRouter as Router, Switch, Route, Link, hashHistory } from "react-router-dom";

class HomeCarousel extends React.Component {
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
      <MDBCol lg="6" md="6" className="mb-lg-2 mb-4">
      <MDBCard collection className="z-depth-1-half">
        <div className="view zoom">
          <Link to={this.props.categoryName}>
            <img
              src={this.props.categoryImage}
              className="img-fluid"
              alt=""
            />
          </Link>
        </div>
      </MDBCard>
    </MDBCol>
    );
  }
}

export default HomeCarousel;