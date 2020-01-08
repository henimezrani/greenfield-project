const mongoose = require('mongoose')
const model = require('../models/userModel')

//function to create user !
let createUser = (data) => {
  let user = new model.User(data)
  console.log(user)
  return user.save()
}

let findUser = (data) => {
  return model.User.findOne(data);
}
//export function to create and save user
module.exports.createUser = createUser

//export function to find User
module.exports.findUser = findUser