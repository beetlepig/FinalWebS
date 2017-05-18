let express = require('express');

let users = require('../controllers/users/index');

let proyectos = require('../controllers/Proyectos/index');

let app= require('../app');



let router = express.Router();


router.post('/users' ,users.getUsers);

router.post('/users/create' ,users.createUser);

router.post('/proyectos', proyectos.getProyectos);

router.post('/posts/create', proyectos.createPosts);

router.post('/like',proyectos.setLike);






module.exports = router;
