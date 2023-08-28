//endpoints
const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const User = require('./users-model')
const Post = require('../posts/posts-model')

// The middleware functions also need to be required
const { 
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware')

//remember to export this 
const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
    .then(users => {
        res.json(users)
    }) 
    .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  //console.log(req.user)
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  // console.log(req.name)
  User.insert({ 
    name: req.name
  }) 
  .then(newUser => {
    // throw new Error('ouch')
    res.status(201).json(newUser)
  })
  .catch(next)
}); 

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  // console.log(req.user);
  // console.log(req.name);

  User.update(req.params.id, { name: req.name })
    .then(() => {
      return User.getById(req.params.id)
    })
    .then(user => {
      res.json(user)
    })
    .catch(next)
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  // console.log(req.user)
  try{
    await User.remove(req.params.id);
    res.json(req.user)
  } catch(err) {
      next(err)
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  console.log(req.user)

  try{
    const result = await User.getUserPosts(req.params.id)
    res.json(result)
  } catch (err){
    next(err)
  }

});


router.post('/:id/posts', validateUserId, validatePost,  async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  // console.log(req.user);
  // console.log(req.text);

  try{
    // throw new Error('cannot add new post')
    const result = await Post.insert({
      user_id: req.params.id,
      text: req.text
    })
    res.status(201).json(result)
  } catch (err){
    next(err)
  }


});


// ERROR HANDLING MW at the end of this route
router.use((err, req, res, next) => { //eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: "something happened inside posts router",
    message: err.message,
    stack: err.stack,
  })
})




// do not forget to export the router
module.exports = router;