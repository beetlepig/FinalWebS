let express = require('express');

let users = require('../controllers/users/index');

let proyectos = require('../controllers/Proyectos/index');

let miembros = require('../controllers/Miembros/index');

let app= require('../app');



let router = express.Router();


router.post('/users' ,users.getUsers);

router.post('/users/create' ,users.createUser);

router.post('/proyectos', proyectos.getProyectos);

router.post('/proyectos/create', proyectos.createProyecto);

router.post('/miembros',miembros.getMiembros);

router.post('/miembros/create',miembros.createMiembro);

router.post('/miembros/view',miembros.getTareas);

router.post('/tareas/create',miembros.crearTarea);






module.exports = router;
