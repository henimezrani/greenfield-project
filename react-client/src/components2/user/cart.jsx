import React, { Component } from "react";
import { MDBRow, MDBCard, MDBCardBody, MDBTooltip, MDBTable, MDBTableBody, MDBTableHead, MDBInput, MDBBtn } from "mdbreact";
import {Link} from "react-router-dom";

class Cart extends Component {
  constructor(props) {
    super(props)
      this.state = {
          columns: [
            {
              label: '',
              field: 'image',
            },
            {
              label: <strong>Product</strong>,
              field: 'title'
            },
            {
              label: <strong>Tag</strong>,
              field: 'tag'
            },
            {
              label: <strong>Color</strong>,
              field: 'color'
            },
            {
              label: <strong>Price</strong>,
              field: 'price'
            },
            {
              label: <strong>QTY</strong>,
              field: 'quantity'
            },
            {
              label: <strong>Size</strong>,
              field: 'size'
            },
            {
              label: <strong>Total</strong>,
              field: 'total'
            },
            {
              label: <strong>Delete</strong>,
              field: 'button'
            }
        ]
      }
  }

  componentDidMount() {
    console.log(this.props.cartItems)
  }

  removeItem(event){
    var productId = event.target.id
    console.log(productId)
    this.props.deleteFromCart(productId);
  }

  render() {
    const rows = [];
    const { columns, products } = this.state;

    this.props.cartItems.map(row => {
      return rows.push(
        {
        'img': <img src={row.product.image} alt="" className="img-fluid z-depth-0" />,
        'product': [<h5 className="mt-3" key={new Date().getDate + 1}><strong>{row.product.title}</strong></h5>, <p key={new
          Date().getDate} className="text-muted">{row.product.brand}</p>],
        'tag': row.product.tag,
        'color': row.product.color,
        'price': `$${row.product.price}`,
        'quantity': row.quantity,
        'size': row.selectedSize,
        'total': <strong>${row.quantity * row.product.price}</strong>,
        'button':
        <MDBTooltip placement="top">
            <MDBBtn id={row.product._id} color="primary" size="sm" onClick={this.removeItem.bind(this)}>
                X
            </MDBBtn>
            <div>Remove item</div>
        </MDBTooltip>
        }
      )
    });

    return (
      <div className='order'>
      <MDBRow className="my-2" center>
        <MDBCard className="w-100">
          <MDBCardBody>
            <MDBTable className="product-table">
              <MDBTableHead className="font-weight-bold" color="mdb-color lighten-5" columns={columns} />
              <MDBTableBody rows={rows} />
            </MDBTable>
            {
              (this.props.cartItems.length !== 0) ? (
                <div className="row" style={{textAlign: "center"}}>
                  <div className="col-md-8">
                    <h3><strong>Your total is: </strong> {this.props.totalPrice}$</h3>
                  </div>
                  <div className="col-md-4">
                    <div className="col-md-12 text-center text-md-left text-md-right">
                      <Link to="/checkout">
                        <button className="btn btn-primary btn-rounded" >
                          <i className="fas fa-cart-plus mr-2" aria-hidden="true" ></i> Proceed to Checkout
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-12" style={{paddingTop: "80px", paddingBottom: "80px", textAlign: "center"}}>
                  <h2>Your cart is empty</h2>
                </div>
              )
            }
          </MDBCardBody>
        </MDBCard>
      </MDBRow>
      </div>
    );
  }
}

export default Cart;