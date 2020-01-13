const jwt = require('jsonwebtoken')

//this middleware is a function that we called before protected route to check if the user is login or not
// we check the status of user with this token expiration date
//using jwt liab we can check the token is valid or not by calling the function jst.verify
let verifyToken = (req, res, next) => {

  const token = req.body.data

  if(!token) {
    res.status(200).json({"hasToken": false , msg:"You don't have a token"})
  } else {
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET)
      req.user = verified
      next()
    }
    catch(err) {
      res.status(400).send({"hasToken": false , msg:" SOME ERROR "})
    }
  }
}

module.exports = verifyToken