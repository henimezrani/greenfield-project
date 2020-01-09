const router = require('express').Router()
const verfiyToken = require('../Middleware/verifyToken')


//this route is juste for testing
router.post('/api/post', verfiyToken, (req, res) => {
  console.log('here')
  res.json({posts: {title:'post test 1 '}})
})

module.exports = router