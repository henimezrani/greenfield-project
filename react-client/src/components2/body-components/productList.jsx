import React from "react";
import $ from "jquery"
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBIcon, MDBTooltip, MDBBadge, MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBBtn } from "mdbreact";
import { BrowserRouter as Router, Switch, Route, Link, hashHistory, useParams } from "react-router-dom";


class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    $.get(`/api/customer_products/${this.props.match.params.gender}/${this.props.match.params.tag}`, (result)=> {
      console.log(this.props.match.params.gender)
      console.log(this.props.match.params.tag)
      console.log(result)
      this.setState({
        products: result
      })
    })
  }

  render() {
    return (
      <section className="text-center my-5">
        {
          console.log(this.props.match)
        }
      <h2 className="h1-responsive font-weight-bold text-center my-5">
        Check our all our {this.props.match.params.tag.toLowerCase()}
      </h2>
      <MDBRow>
        {
          this.state.products.map((element, index)=>(
            <MDBCol lg="3" md="6" className="mb-lg-0 mb-4" key={index}>
              <Link to={`/store/${this.props.match.params.gender.toLowerCase()}/${this.props.match.params.tag.toLowerCase()}/${element._id}`}>
                <MDBCard className="align-items-center">
                  <MDBCardImage
                    src={element.image}
                    top
                    alt="sample photo"
                    overlay="white-slight"
                  />
                  <MDBCardBody className="text-center">
                    <h5>{element.title}</h5>
                    <h5>
                      <strong>{element.brand}</strong>
                    </h5>
                    <h4 className="font-weight-bold blue-text">
                      <strong>{element.price}</strong>
                    </h4>
                  </MDBCardBody>
                </MDBCard>
              </Link>
            </MDBCol>
          ))
        }


      </MDBRow>
    </section>
    )
  }
}

export default ProductList;