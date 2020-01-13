import React from "react";
import Modal from "react-modal";

//class based component that include two main method to update and delete product
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      showModal: false,
      title: "",
      description: "",
      price: "",
      category: "",
      brand: ""
    };
  }

  //fetching data from api to get all product before the component will render and set the state
  componentWillMount() {
    fetch("/api/allproducts")
      .then(data => {
        return data.json();
      })
      .then(products => this.setState({ products }));
  }

  //delete product
  //this function responsable for del product using the api just we need to pass the id and send req to api
  deleteProduct(e) {
    e.preventDefault();
    fetch(`/api/delete/product/${e.target.id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "DELETE"
    });
    window.location.reload(false);
  }

  //update product
  //this method play with display the form that the admin can pass his request for updating data of product.
  updateProduct(e) {
    e.preventDefault();
    this.setState({ productId: event.target.id, showModal: !this.state.showModal });
  }

  typing(event) {
    this.setState({[event.target.id]: event.target.value});
  }

   //method that send updated request to the server and it's take an obj that contains all the data that the user want to update
  saveAndUpdate(e) {
    e.preventDefault();
    let data = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
      brand: this.state.brand,
      category: this.state.category
    };
    fetch(`/api/update/product/${e.target.id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    });
  }
  render() {
    return (
      <div>
      {
        (this.state.showModal) ? (
          <form className="ui small form" id={this.state.productId} onSubmit={this.saveAndUpdate.bind(this)} >
          <div >
            <label>Product Name</label>
            <input type="text" id="title" placeholder="Product Name" onChange={this.typing.bind(this)} />
          </div>
          <div>
            <label>Product Price</label>
            <input
              onChange={this.typing.bind(this)}
              type="number"
              id="price"
              placeholder="Product price"
            />
          </div>
          <div>
            <label>Product Description</label>
            <input
              onChange={this.typing.bind(this)}
              type="text"
              id="description"
              placeholder="Product Description"
            />
          </div>
          <div id="category" onChange={this.typing.bind(this)}>
            <select className="ui dropdown">
              <option value>category</option>
              <option value={"men"}>Men</option>
              <option value={"momen"}>Women</option>
            </select>
          </div>
          <div>
          <label>Brand</label>
            <input
              onChange={this.typing.bind(this)}
              type="text"
              id="brand"
              placeholder="Product Brand"
            />
          </div>
          <button type="submit" className="ui green button"> update </button>
          <button type="submit" className="ui red button" onClick={this.updateProduct.bind(this)} > close </button>
          </form>
      ):(
      <div>
        <div className="ui search">
          <div className="ui icon input">
            <input className="prompt" type="text" placeholder="Search ..." />
            <i className="search icon" />
          </div>
        </div>
        {this.state.products.map(el => (
            <div className="ui celled list" key={el._id}>
              <div className="item">
                <img
                  className="ui image"
                  src={el.image}
                  width="120px"
                  height="120px"
                />
                <div className="content">
                  <div className="header">{el.title}</div>
                </div>
                <div>{el.description}</div>
                <div> {el.brand}</div>
                <div> {el.category}</div>
                <div>{el.price} €</div>
                <div>
                  <div className="ui buttons">
                    <button
                      id={el._id}
                      className="ui red button"
                      onClick={this.deleteProduct}
                    >
                      Delete
                    </button>

                    <button
                      id={el._id}
                      type="submit"
                      className="ui positive button"
                      onClick={this.updateProduct.bind(this)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        })
      </div>
)
      }
      </div>
    );
  }
}
export default Product;




