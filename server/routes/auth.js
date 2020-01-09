const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//import user controller
const userControllers = require('../../database-mongo/controllers/userController')
/// basic auth
router.post('/register', async (req, res) => {
 // console.log(req.body)
  const { name, email, password, confirmedPassword } = req.body

  const user = await userControllers.findUser({ name })
  const userEmail = await userControllers.findUser({ email })
  //check if the user exisit or not
  if (user) { res.json({ registred: false, msg: "user exist !" }).status(301) }
  if (userEmail) { res.json({ registred: false, msg: "email exist !" }).status(301) }

  else {
    //check the confirmed password match with the password
    if (password === confirmedPassword) {
      //hash the password and saved it
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) reject(err)
          resolve(hash)
        })
      })
      const savedUser = await userControllers.createUser( { name, email, hashedPassword }  )
      const token = jwt.sign(
        { _id: savedUser.id },// id of new user created
        process.env.TOKEN_SECRET,
        { expiresIn: 3600 }
      )
      //in the front you need to save the tokon in local storage
      res.header('auth-token', token) //saving the token in the header !!
      res.status(200).json({ registred: true, msg: "user registred !", details: savedUser,token })
    }
      res.status(401).send({ registred: false, msg: "wrong password !" })
  }

})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  //check if the userName is registered or not
  const user = await userControllers.findUser({ email })
  if (!user) { res.send("user not exisit") }
  else {
    //if the userName exsit in database check the password
    bcrypt.compare(password, user.hashedPassword).then((match) => {
      if (!match) { res.status(403).json({ login: false, msg: "incorrect password !" }) }
      else {
        //create and assign a token
        const token = jwt.sign(
          { _id: user.id },// id from database
          process.env.TOKEN_SECRET,
          { expiresIn: 3600 }
          )
        res.header('auth-token',token) //saving the token in the header !!
        res.status(200).json({ login: true, msg: "correct password !", token })
        //redirect user
      }
    })
  }
})

//////////////////////////////// auth with social media /////////////////////////////////////////

/// facebook auth /////

const passport = require('passport')
const FacebookTokenStragtegy = require('passport-facebook-token') //function
const FacebookStrategy  =     require('passport-facebook').Strategy

passport.use('facebookToken', new FacebookTokenStragtegy({
  clientID: process.env.Facebook_Client_ID ,
  clientSecret: process.env.Facebook_App_Secret}, async (accessToken, refreshToken, profile, done) => {
    try {
      id_facebook = profile._json.id
      email_facebook = profile._json.email
      name = profile._json.first_name + " " + profile._json.last_name
      token = accessToken;
      console.log(id_facebook)
      console.log(email_facebook)

      const user = await userControllers.findUser({ id_facebook })
      const userEmail = await userControllers.findUser({ email_facebook })
      if (user) {
        return done(null,user)
      }
      const savedUser = await userControllers.createUser({ id_facebook, email_facebook, name })
      done(null,savedUser)

      console.log('refreshToken', refreshToken)
    } catch (error) {
      done(error, false, error.message)
    }
}))

//
router.post('/fb/register', passport.authenticate('facebookToken', { session: false }), (req, res, next) => {
  //console.log(req.user)
  const token = jwt.sign(
    { _id: req.user._id },// id of new user created
    process.env.TOKEN_SECRET,
    { expiresIn: 3600 }
  )
  //create new token and sendit into res
  res.header('auth-token', token)
  res.status(200).json({ "user_token": token , "user_details": req.user})
})

module.exports = router