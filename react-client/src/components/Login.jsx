import React from 'react';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      someState: []
    }
  }

  onLogin(e){
    e.preventDefault()
    let data = {
      email :e.target.email.value,
      password:e.target.password.value,
    }
    fetch("/api/user/login", {
      method: "POST",headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      let token = response.headers.get('auth-token');
      window.localStorage.setItem('token',token);
      response.json().then(result => {
        console.log(result)
      })
    })
  }

  goHomePage(e) {
    e.preventDefault();
    console.log("home")
    let token = window.localStorage.getItem('token')
    console.log(token)

    fetch('/api/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data : token })
    })
    .then(response => {
      response.json().then(result => {
        console.log(result)
      })
    })
  }

  render () {
    return (<div>
      <form className="login" onSubmit = {this.onLogin.bind(this)}>

        <label>Email</label>
        <input type="text" name="email" /><br/>

        <label>Password</label>
        <input type="password" name="password"/><br/>

        <button type="submit">Login</button><br/>

      </form>
      <form method="POST" action="/api/test" onSubmit= {this.goHomePage.bind(this)}>

        <button type="submit"> Home page </button>

      </form>
    </div>)
  }
}

export default Login