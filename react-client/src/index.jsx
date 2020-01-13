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
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Body from "./components/Body.jsx";

import Cart from "./components/user/cart.jsx";
import Login from "./components/user/login.jsx";
import SignUp from "./components/user/signup.jsx";
import Account from "./components/user/account.jsx";
import Checkout from "./components/user/checkout.jsx";

import Dashboard from "./components/dashboard/dashboard.jsx"
import ProductList from "./components/body-components/productList.jsx";
import ProductDetails from "./components/body-components/ProductDetails.jsx";
import Categories from "./components/body-components/categories.jsx";

// This is the main app component. The states that are saved here are used for authentification purposes (rendering the correct information if the user is logged in) and checkout purposes (keeping the cart items in this state to communicate between the orders and the products components)
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

  // this function is passed to the authentification components (register and login), to set the user data when the user is logged in
  setUserData(id, name, email) {
    this.setState({
      userData: {
        _id: id,
        name: name,
        email: email
      }
    })

  }

  // this function is called when the user logs out, setting the userdata to its initial state and deleting the token from the local storage
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

  // on mount, this request sets the user information if it finds a token in the local storage.
  componentDidMount() {
    var that = this
    $.post('/api/test', {data: window.localStorage.token}, (res)=> {
      if(res.hasToken) {
        $.get(`/api/getUserById/${res.userId._id}`, function(response) {
          that.setUserData(response._id, response.name, response.email)
        })
      }
    })
  }

  // this function allows the communication between the products components and the cart component to add products to card and calculate the total dynamically
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

  // this function deletes an item from the cart, it is here because it needs communication between products and cart components
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

  // this function resets the states to their initial value after the user submits an order. however, it keeps the userdata (keeping the user logged in)
  reset() {
    this.setState({
      cartItems : [],
      totalPrice: 0
    })
  }

  // this component handles routing of all elements that will be rendered in the body. we use "store" for the website components and "dashboard" for the admin components. notice that the store components only use parameters, allowing the minimum ammount of components and the maximum ammount of DRY.
  // also, notice the use of render instead of component in the path to the product details. it allows you to pass props and parameters at the same time.
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

            <Route exact path="/dashboard" component={Dashboard} />

          </Switch>

          <Footer />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
