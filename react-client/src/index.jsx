import React from 'react';
import ReactDOM from 'react-dom';

import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      someState: []
    }
  }

  render () {
    return (<div>
      <Register />

      <Login />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));