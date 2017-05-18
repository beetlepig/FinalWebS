let express = require('express');

let users = require('../controllers/users/index');

let posts = require('../controllers/Posts/index');

let app= require('../app');

let router = express.Router();


router.post('/users',users.getUsers);

router.post('/users/create',users.createUser);

router.get('/posts', posts.getPosts);

router.post('/posts/create', posts.createPosts);

router.post('/like',posts.setLike);






module.exports = router;
