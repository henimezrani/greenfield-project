import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  hashHistory
} from "react-router-dom";
import ReactDOM from "react-dom";
import $ from 'jquery';
import Header from "./components2/Header.jsx";
import Footer from "./components2/Footer.jsx";
import Body from "./components2/Body.jsx";

import Cart from "./components2/user/cart.jsx";
import Login from "./components2/user/login.jsx";
import SignUp from "./components2/user/signup.jsx";
import Account from "./components2/user/account.jsx";
import Checkout from "./components2/user/checkout.jsx";


import ProductList from "./components2/body-components/productList.jsx";
import Women from "./components2/categories/Women.jsx";
import ProductDetails from "./components2/categories/ProductDetails.jsx";
import Categories from "./components2/body-components/categories.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        _id: "",
        name: "",
        email: ""
      },
      cartItems : [],
      totalPrice: 0
    }
  }

  setUserData(id, name, email) {
    this.setState({
      userData: {
        _id: id,
        name: name,
        email: email
      }
    })

  }

  resetUserState() {
    window.localStorage.clear()
    this.setState({
      userData: {
        _id: "",
        name: "",
        email: ""
      }
    })
  }

  componentDidMount() {
    // data{
    //   data: window.localStorage
    // }
    console.log(window.localStorage.token)
    var that = this
    $.post('/api/test', {data: window.localStorage.token}, (res)=> {
      if(res.hasToken) {
        console.log(res)
        $.get(`/api/getUserById/${res.userId._id}`, function(response) {
          that.setUserData(response._id, response.name, response.email)
        })
      } else {
        console.log(res)
      }

    })
  }

  addToCart(product, selectedSize, quantity) {
    var arr = this.state.cartItems
    var total = this.state.totalPrice + product.price
    arr.push({
      product,
      selectedSize,
      quantity
    })
    this.setState({
      cartItems: arr,
      totalPrice: total
    })
    console.log(this.state.cartItems)
  }

  deleteFromCart(productId){
    var arr = this.state.cartItems
    var newPrice = this.state.totalPrice
    arr.map((elem, index) => {
      console.log(typeof elem.product._id)
      console.log(typeof productId)
      if (elem.product._id === productId) {
        arr.splice(index, 1);
        newPrice -= elem.product.price
      }
    })
    this.setState({
      cartItems: arr,
      totalPrice: newPrice
    })
  }

  reset() {
    this.setState({
      cartItems : [],
      totalPrice: 0
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Header userData={this.state.userData} resetUserState={this.resetUserState.bind(this)} />

          <Switch>
            <Route exact path="/" component={() => <Body /> } />

            <Route exact path="/store/:gender" component={Categories} /> } />

            <Route exact path="/store/:gender/:tag" component={ProductList} />
            <Route path={`/store/:gender/:tag/:id`} render={({match}) => ( <ProductDetails gender={match.params.gender} tag={match.params.tag} id={match.params.id} addToCart={this.addToCart.bind(this)} /> )} />

            <Route exact path="/cart" component={() => <Cart userData={this.state.userData} totalPrice={this.state.totalPrice} cartItems={this.state.cartItems} deleteFromCart={this.deleteFromCart.bind(this)} />} />

            <Route exact path="/checkout" component={() => <Checkout userData={this.state.userData} totalPrice={this.state.totalPrice} cartItems={this.state.cartItems} reset={this.reset.bind(this)}/>} />

            <Route exact path="/account" component={() => <Account userData={this.state.userData} setUserData={this.setUserData.bind(this)} /> } />

          </Switch>

          <Footer />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
