import React from 'react';
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      someState: []
    }
  }

  onHandelSubmit(e) {
    e.preventDefault()
    let data = {
      name: e.target.name.value,
      email :e.target.email.value,
      password:e.target.password.value,
      confirmedPassword: e.target.confirmedPassword.value
    }
    fetch("/api/user/register",{
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

  registerFb(e) {
    e.preventDefault();

    api/user/fb/register
    console.log("test facebook ")
  }

  render () {
    return (<div>
      <form className="login " onSubmit = {this.onHandelSubmit.bind(this)}>

        <label>Name:</label>
        <input type="text"  name="name"/><br/>

        <label>E-mail</label>
        <input type="text"  name="email" /><br/>

        <label>Password</label>
        <input type="password"  name="password"/><br/>

        <label>Confirm password</label>
        <input type="password" name ="confirmedPassword"/><br/>

        <button type="submit">Create an account</button><br/>

      </form>
      <form onSubmit = {this.registerFb.bind(this)}>

        <button type="submit" >Login with Facebook</button>

      </form>
    </div>)
  }
}

export default Register