import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Product from "./dashbord/product.jsx";
import Orders from "./dashbord/Orders.jsx";
import WomenProducts from "./dashbord/WomenProducts.jsx";
import MenProducts from "./dashbord/MenProducts.jsx";

import NavBar from "./dashbord/NavBar.jsx";
import Home from "./dashbord/Home.jsx";
import AddProduct from "./dashbord/AddProduct.jsx";


//this component is the main component of dashbord it regroupe all the component with the router
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      menProducts: [],
      womenProducts: []
    };
  }
  // this function responsable for fetch all data before the component will render to get data from the api and update the state
  componentWillMount() {
    fetch("/api/allproducts")
      .then(data => {
        return data.json();
      })
      .then(products => this.setState({ products }));
    // fetching order
    fetch("/api/orders")
      .then(data => {
        return data.json();
      })
      .then(orders => this.setState({ orders }));

    // fetch women product
    //this function responsable for fetching data using the api to set state of all women products
    fetch("/api/customer_products/women")
      .then(data => {
        return data.json();
      })
      .then(womenProducts => this.setState({ womenProducts }));

    // fetch men product
    //this function responsable for fetching data using the api to set state of all men products
    fetch("/api/customer_products/men")
      .then(data => {
        return data.json();
      })
      .then(menProducts => this.setState({ menProducts }));
  }

  render() {
    return (

      //we used  react router to navigate through component and passing the state as props for child components
      //The Navbar putted outside the Switch to be rendered as fixed component
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/dashboard" component={Home} />
            <Route exact path="/dashboard/orders" component={Orders}>
              <Orders data={this.state.orders} />
            </Route>
            <Route exact path="/dashboard/allproducts" component={Product}>
              <Product />
            </Route>
            <Route exact path="/dashboard/womenProducts" component={WomenProducts}>
              <WomenProducts data={this.state.womenProducts} />
            </Route>
            <Route exact path="/dashboard/menProducts" component={MenProducts}>
              <MenProducts data={this.state.menProducts} />
            </Route>
            <Route path="*" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Dashboard;
