import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Test from './components/Test.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      someState: []
    }
  }

  componentDidMount() {
    // $.ajax({
    //   url: '/someroute',
    //   success: (data) => {
    //     this.setState({
    //       someState: data
    //     })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
  }

  render () {
    return (<div>
      <h1>Testing connection</h1>
      <Register />
      <Login />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));