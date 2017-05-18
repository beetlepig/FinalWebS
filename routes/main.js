/**
 * Created by sky_k on 17/05/2017.
 */
let express = require('express');


let app= require('../app');

let router = express.Router();


router.get('/',(req,res,next)=>{
    res.render("index",{title: "hola"});
});






module.exports = router;