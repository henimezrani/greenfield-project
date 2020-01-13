const jwt = require('jsonwebtoken')

let verifyToken = (req, res, next) => {

  const token = req.body.data
  console.log(token)

  if(!token) {
    console.log("no token")
    res.status(200).json({"hasToken": false , msg:"You don't have a token"})
  } else {
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET)
      req.user = verified
      console.log("there's a token")
      next()
    }
    catch(err) {
      console.log('theres an error')
      res.status(400).send({"hasToken": false , msg:" SOME ERROR "})
    }
  }
}

module.exports = verifyToken