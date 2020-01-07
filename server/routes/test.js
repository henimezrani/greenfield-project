const router = require('express').Router()
const verfiyToken = require('../Middleware/verifyToken')


//this route is juste for testing
router.get('/',verfiyToken,(req, res) => {
  res.json({posts: {title:'post test 1 '}})
})

module.exports = router