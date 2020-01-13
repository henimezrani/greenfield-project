import React from "react";
import Modal from "react-modal";

//class based component that get orders data as propos
class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
    this.updateOrder = this.updateOrder.bind(this);
  }
  //function that update the order that generated to the admin {not finished}
  updateOrder(e) {
    e.preventDefault();
    document.querySelectorAll(":checked")[1].value;
  }
  render() {
    return (
      <div className="ui list">
        {this.props.data.map(el => {
          return (
            <div className="item" key={el._id}>
              <div className="content">
                <div className="header"> {el.status}</div>
                <div> payment method : {el.payment_method}</div>
                <div> total purchase : {el.total_order_price}</div>
              </div>
              <form onSubmit={this.updateOrder}>
                <div id={el._id}>
                  <span style={{ fontWeight: "bold" }}>status : </span>
                  <label htmlFor="pending">pending</label>
                  <input id="pending" type="radio" value="pending" />
                  <label htmlFor="inProgress">in progress</label>
                  <input id="inProgress" type="radio" value="inProgress" />
                  <label htmlFor="shipped">shipped</label>
                  <input id="shipped" type="radio" value="shipped" />
                  <label htmlFor="cancel">cancel </label>
                  <input id="cancel" type="radio" value="cancel" />
                </div>
                <button type="submit" className="tiny green ui button">
                  confirm
                </button>
              </form>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Orders;
<div className="ui list">
  <div className="item">
    <div className="header">New York City</div>A lovely city
  </div>
</div>;
