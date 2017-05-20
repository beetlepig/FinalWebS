/**
 * Created by sky_k on 17/05/2017.
 */
let express = require('express');

let router = express.Router();


router.get('/',(req,res,next)=>{
    res.render("index");
});

router.get('/registro',(req,res,next)=>{
    res.render("registro");
});

router.get('/proyectos',(req,res,next)=>{
    res.render("proyectos");
});

router.get('/proyectos/view',(req,res,next)=>{
    res.render("vistaProyecto");
});







module.exports = router;