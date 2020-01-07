const jwt = require('jsonwebtoken')

let verfiyToken = (req, res, next) => {
  //get the token from the header
  const token = req.header('auth-token')
  if(!token) {
    console.log(req.header.auth-token)
    res.status(401).json({"hasToken": false , msg:" Acess denied "})
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    next()
  }
  catch(err) {
    res.status(400).send('invalid token')
  }

}
//export as function
module.exports = verfiyToken