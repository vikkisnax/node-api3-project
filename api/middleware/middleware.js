function logger(req, res, next) {
  // console.log('logger:', logger);
  const timestamp = new Date().toLocaleString()
  //method - get put, etc. is inside req.method
  const method = req.method
  // url - can find it in many places
  const url = req.originalUrl
  console.log(`[${timestamp} ${method} to ${url}]`)
  next()
}

function validateUserId(req, res, next) {
  console.log('validateUserId:', validateUserId)
  next()
}

function validateUser(req, res, next) {
  console.log('validateUser:', validateUser)
  next()
}

function validatePost(req, res, next) {
  console.log('validatePost:', validatePost)
  next()
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
