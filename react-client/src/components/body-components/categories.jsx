import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBIcon, MDBTooltip, MDBBadge, MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBBtn } from "mdbreact";
import { BrowserRouter as Router, Switch, Route, Link, hashHistory, useParams } from "react-router-dom";

// This component allows us to render all tags inside one category dynamically. Since we don't have a tags database, we will use an array of tags for men and women to render those states dynamically to the component given their tagname, picture and link.

// The component decides which array to use based on the params in the URL using this.props.match.params.gender
class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.state = {
      men: {
        gender: "Men",
        tags: [
          {
            tagName: "Tops",
            tagImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH5A1uhlHyOJWv5L4aDYe1mHOVnMfTQl8d7GbBlcJ6XasEgrRP&s",
            tagLink: "/store/men/tops"
          },
          {
            tagName: "Shirts",
            tagImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ62UD_jA5XdXsOz5e1vzPcavC8xr-UfNUM-ssFk7_5GIJA5uLC&s",
            tagLink: "/store/men/shirts"
          },
          {
            tagName: "Jeans",
            tagImage: "https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/1.jpg",
            tagLink: "/store/men/jeans"
          },
          {
            tagName: "Jackets",
            tagImage: "https://ae01.alicdn.com/kf/HTB1ta5XLpXXXXXcXXXXq6xXFXXXN/2019-Brand-New-Jacket-Men-Top-Design-Casual-Outwear-Spring-Autumn-Slim-Fit-Solid-Mens-Jackets.jpg",
            tagLink: "/store/men/jackets"
          },
          {
            tagName: "Shoes",
            tagImage: "https://www.dhresource.com/600x600/f2/albu/g9/M00/37/17/rBVaWF3crHiAAIQcAATYeWvbH9E318.jpg",
            tagLink: "/store/men/shoes"
          },
          {
            tagName: "T-Shirts",
            tagImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH5A1uhlHyOJWv5L4aDYe1mHOVnMfTQl8d7GbBlcJ6XasEgrRP&s",
            tagLink: "/store/men/t-shirts"
          }
        ]
      },
      women: {
        gender: "Women",
        tags: [
          {
            tagName: "Jackets",
            tagImage: "https://ae01.alicdn.com/kf/HTB1ta5XLpXXXXXcXXXXq6xXFXXXN/2019-Brand-New-Jacket-Men-Top-Design-Casual-Outwear-Spring-Autumn-Slim-Fit-Solid-Mens-Jackets.jpg",
            tagLink: "/store/women/jackets"
          },
          {
            tagName: "Outerwear",
            tagImage: "https://oldnavy.gap.com/webcontent/0016/963/918/cn16963918.jpg",
            tagLink: "/store/women/outerwear"
          },
          {
            tagName: "Jeans",
            tagImage: "https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/1.jpg",
            tagLink: "/store/women/jeans"
          }
        ]
      }
    };
  }

  render() {
    return (
      <div>
        <section className="text-center my-5">
          <h1>All {this.state[this.props.match.params.gender].gender} products </h1>
          <MDBRow>
          {
            this.state[this.props.match.params.gender].tags.map((element, index)=> (
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

export default Categories;