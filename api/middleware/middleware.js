//to access users data so we can use the functions 
const User = require('../users/users-model')

function logger(req, res, next) {
  // console.log('logger:', logger);
  const timestamp = new Date().toLocaleString()
  // method - get,put, etc. are inside req.method
  const method = req.method
  // url - can find it in many places, one way below
  const url = req.originalUrl
  console.log(`[${timestamp} ${method} to ${url}]`)
  next()
}

async function validateUserId(req, res, next) {
  // console.log('validateUserId:', validateUserId)
  // next()
  try {
    const user = await User.getById(req.params.id)
    if (!user){
      res.status(404).json({
        message: "user not found",
      })
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: 'problem finding user',
    })
  }
}

function validateUser(req, res, next) {
  // console.log('validateUser!!!!!:', validateUser)
  // next()
  const { name } = req.body;
  if (!name || !name.trim()){
    res.status(400).json({
      message: "missing required name field",
    })
  } else {
    //now on the req obj we can console log it -- in router file
    req.name = name.trim()
    next()
  }
}

function validatePost(req, res, next) {
  // console.log('validatePost:', validatePost)
  // next()
  const { text } = req.body;
  if (!text || !text.trim()){
    res.status(400).json({
      message: "missing required text field",
    })
  } else {
    //now on the req obj we can console log it -- in router file -- trim white space
    req.text = text.trim()
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
