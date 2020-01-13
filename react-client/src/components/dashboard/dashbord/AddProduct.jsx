import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }
  onSubmit(e) {
    e.preventDefault();
    let brandValue = document.querySelectorAll(":checked")[1].value;
    let categoryValue = document.querySelectorAll(":checked")[0].value;
    let data = {
      title: e.target.name.value,
      description: e.target.description.value,
      price: e.target.price.value,
      brand: brandValue,
      category: categoryValue
    };
    fetch("/api/add/product", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    });
  }
  render() {
    return (
      <form className="ui small form" onSubmit={this.onSubmit.bind(this)}>
        <div className="field">
          <label>Product Name</label>
          <input type="text" id="name" placeholder="Product Name" />
        </div>
        <div className="field">
          <label>Product Price</label>
          <input type="number" id="price" placeholder="Product price" />
        </div>
        <div className="field">
          <label>Product Description</label>
          <input
            type="text"
            id="description"
            placeholder="Product Description"
          />
        </div>
        <div className="field" id="gender">
          <select className="ui dropdown">
            <option value>category</option>
            <option value={"Men"}>Male</option>
            <option value={"Women"}>Female</option>
          </select>
        </div>
        <div className="field">
          <select className="ui dropdown" id="brand">
            <option value>Brand</option>
            <option value={"band 1"}>brand 1</option>
            <option value={"band 2"}>brand 2</option>
            <option value={"band 3"}>brand 3</option>
            <option value={"band 4"}>brand 4</option>
          </select>
        </div>
        <button className="ui button" type="submit">
          Add product
        </button>
      </form>
    );
  }
}

export default AddProduct;
