const jwt = require('jsonwebtoken')
let verfiyToken = (req, res, next) => {
  //get the token from the header
  const token = req.body.data
  console.log(token)

  //tokenFromWindow = req.body
  //console.log(tokenFromWindow)
  //const token = this.localStorage.getItem(token)
  //console.log("test", token )
  if(!token) {
    console.log(req.header.auth-token)
    res.status(401).json({"hasToken": false , msg:" Acess denied "})
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    console.log("******")
    next()
  }
  catch(err) {
    res.status(400).send('invalid token')
  }

}
//export as function
module.exports = verfiyToken