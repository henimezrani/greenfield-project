const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//import user controller
const userControllers = require('../../database-mongo/controllers/userController')

router.post('/register', async (req, res) => {
  const { name, email, password, confirmedPassword } = req.body

  const user = await userControllers.findUser({ name })
  //check if the user exisit or not
  if (user) { res.json({ registred: false, msg: "user exisit !" }).status(301) }

  else {
    //check the confirmed password match with the password
    if (!user && password === confirmedPassword) {
      //hash the password and saved it
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) reject(err)
          resolve(hash)
        })
      })
      const savedUser = await userControllers.createUser({ name, email, hashedPassword })
      //maybe we need to create a token whene client signup for the first time !
      res.status(200).json({ registred: true, msg: "user registred !", details: savedUser })
    }
      res.status(401).send({ registred: false, msg: "wrong password !" })
  }

})

router.post('/login', async (req, res) => {
  const { name, password } = req.body
  //check if the userName is registered or not
  const user = await userControllers.findUser({ name })
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
        res.status(200).json({ login: true, msg: "correct password !"})
        //redirect user
      }
    })
  }
})


module.exports = router