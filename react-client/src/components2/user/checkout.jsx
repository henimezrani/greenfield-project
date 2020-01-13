import React, { Component } from "react";
import { MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBBtn, MDBNav, MDBNavItem, MDBNavLink, MDBTabPane,
MDBTabContent, MDBSelect, MDBSelectInput, MDBSelectOption, MDBSelectOptions } from "mdbreact";
import { BrowserRouter as Router, Switch, Route, Link, hashHistory, useParams } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import $ from "jquery"


class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ordered: false,
      activePill: "1",
      street1: "",
      street2: "",
      city: "",
      zip: "",
      country: "",
      phone_number: "",
      payment_method: "",
      card_number: "",
      expiration: "",
      ccv: ""

    }
  }

  handleClick(event) {
    event.preventDefault();
    var that = this
    var data = {
      userId: this.props.userData._id,
      delivery_info: {
        street1:  this.state.street1,
        street2:  this.state.street2,
        city: this.state.city,
        zip: this.state.zip,
        country: this.state.country,
        phone_number: this.state.phone_number
      },
      card_info: {
        card_number: this.state.card_number,
        expiration: this.state.expiration,
        ccv: this.state.ccv
      },
      products: this.props.cartItems,
      payment_method: "Credit Card",
      total_order_price: this.props.totalPrice
    }
    console.log('sending')

    $.post('/api/add/orders', data, (result)=> {
      this.setState({
        ordered: true
      })
    })

  }

  typing(event) {
    this.setState({[event.target.id]: event.target.value});
    console.log(this.state)
  }

  togglePills(tab) {
    if (this.state.activePill !== tab) {
      this.setState({
        activePill: tab
      });
    }
  }

  selectNextTab() {
    this.setState({
      activePill: (+this.state.activePill + 1).toString()
    });
  }

  render() {
    return (
      <MDBContainer>
          {
            (this.state.ordered) ? (<Redirect to='/' />) : (
              <MDBRow className="my-2" center>
          <MDBCard className="w-100">
            <MDBCardBody>
              <MDBRow>
                <MDBCol lg="8" className="mb-4">
                  <MDBNav pills color="primary" className="nav-justified">
                    <MDBNavItem>
                      <MDBNavLink to="#" className={this.state.activePill==="1" ? "active" : "" } onClick={()=> this.togglePills("1")}
                        >
                        <strong>1. Billing</strong>
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="#" className={this.state.activePill==="3" ? "active" : "" } onClick={()=> this.togglePills("3")}
                        >
                        <strong>2. Payment</strong>
                      </MDBNavLink>
                    </MDBNavItem>
                  </MDBNav>
                  <MDBTabContent className="pt-4" activeItem={this.state.activePill}>
                    <MDBTabPane tabId="1">
                      <form>
                        <MDBRow>
                          <MDBCol>
                            <label htmlFor="email">Phone Number (optional)</label>
                            <input type="tel" id="phone_number" className="form-control mb-4" placeholder="55740255" onChange={this.typing.bind(this)}/>
                            <label htmlFor="address">Address</label>
                            <input type="text" id="street1" className="form-control mb-4" placeholder="1234 Main St" onChange={this.typing.bind(this)}/>
                            <label htmlFor="address-2">Address 2 (optional)</label>
                            <input type="text" id="street2" className="form-control mb-4" placeholder="Apartment or suite" onChange={this.typing.bind(this)}/>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol lg="4" md="12" className="mb-4">
                            <label htmlFor="country">Country</label>
                            <select className="custom-select d-block w-100" id="country" required onChange={this.typing.bind(this)}>
                              <option>Choose...</option>
                              <option value="United States">United States</option>
                              <option value="Tunisia">Tunisia</option>
                            </select>
                            <div className="invalid-feedback">
                              Please select a valid country.
                            </div>
                          </MDBCol>
                          <MDBCol lg="4" md="6" className="mb-4">
                            <label htmlFor="state">City</label>
                            <select className="custom-select d-block w-100" id="city" required onChange={this.typing.bind(this)}>
                              <option>Choose...</option>
                              <option value="Ghazela">Ghazela</option>
                            </select>
                            <div className="invalid-feedback">
                              Please provide a valid state.
                            </div>
                          </MDBCol>
                          <MDBCol lg="4" md="6" className="mb-4">
                            <label htmlFor="zip">Zip</label>
                            <input type="text" className="form-control" id="zip" required onChange={this.typing.bind(this)}/>
                            <div className="invalid-feedback">
                              Zip code required.
                            </div>
                          </MDBCol>
                        </MDBRow>
                      </form>
                    </MDBTabPane>
                    <MDBTabPane tabId="3">
                      <div className="d-block my-3">
                        <div className="mb-2">
                          <input name="group2" type="radio" className="form-check-input with-gap" id="radioWithGap4" required/>
                          <label className="form-check-label" htmlFor="radioWithGap4">Credit card</label>
                        </div>
                        <div className="mb-2">
                          <input iname="group2" type="radio" className="form-check-input with-gap" id="radioWithGap5"
                            required/>
                          <label className="form-check-label" htmlFor="radioWithGap5">Cash on delivery</label>
                        </div>
                        <MDBRow>
                          <MDBCol md="6" className="mb-3">
                            <label htmlFor="cc-number123">Credit card number</label>
                            <input type="text" className="form-control" id="card_number" required onChange={this.typing.bind(this)}/>
                            <div className="invalid-feedback">
                              Credit card number is required
                            </div>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="3" className="mb-3">
                            <label htmlFor="cc-name123">Expiration</label>
                            <input type="text" className="form-control" id="expiration" required onChange={this.typing.bind(this)}/>
                            <div className="invalid-feedback">
                              Name on card is required
                            </div>
                          </MDBCol>
                          <MDBCol md="3" className="mb-3">
                            <label htmlFor="cc-cvv123">CVV</label>
                            <input type="text" className="form-control" id="ccv" required onChange={this.typing.bind(this)}/>
                            <div className="invalid-feedback">
                              Security code required
                            </div>
                          </MDBCol>
                        </MDBRow>
                      </div>
                    </MDBTabPane>
                  </MDBTabContent>
                </MDBCol>
                <MDBCol lg="4" className="mb-4">
                  <MDBBtn color="primary" size="lg" block onClick={this.handleClick.bind(this)}>
                    Place order
                  </MDBBtn>
                  <MDBCard>
                    <MDBCardBody>
                      <h4 className="mb-4 mt-1 h5 text-center font-weight-bold">Summary</h4>
                      <hr />
                      {
                        this.props.cartItems.map((element, index)=>(
                          <div>
                            <MDBRow>
                              <MDBCol sm="8">
                                {element.product.title}
                              </MDBCol>
                              <MDBCol sm="4">
                                ${element.product.price}
                              </MDBCol>
                            </MDBRow>
                            <hr />
                          </div>
                        ))
                      }

                      <MDBRow>
                        <MDBCol sm="8">
                          <strong>Total</strong>
                        </MDBCol>
                        <MDBCol sm="4">
                          <strong>$ {this.props.totalPrice}</strong>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
            )
          }

      </MDBContainer>
    );
  }
}

export default Checkout;