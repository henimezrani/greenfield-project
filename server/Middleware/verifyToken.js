const jwt = require('jsonwebtoken')

let verifyToken = (req, res, next) => {

  const token = req.body.data

  if(!token) {
    res.status(401).json({"hasToken": false , msg:"You don't have a token"})
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