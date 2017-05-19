let DB= require('../../models/Proyectos/index');
let fs = require('fs');
let mkdirp = require('mkdirp');


function getProyectos(req, res) {
    let creador= req.body.creador;
    console.log(creador);
    DB.getAll(creador , function(error, pots) {
        if (!error) {
            res.status(200).json(pots);

        } else {

            console.log(error);
            res.status(500).json(error);
        }

    });
}

let createProyecto = function (req, res) {
    let nombre = req.body.nombre;
    let creador= req.body.creador;

    DB.create(nombre, creador, function(err, result) {

        if (err) {
            console.log(err);
            res.status(500).json(err);

        }else {
            res.status(200).json(result);

        }
    });

};


function setLike(req, res) {
let id_usuario=req.body.id_usuario;
let id_post=req.body.id_post;
DB.setLike(id_usuario,id_post, function (err, result) {
    if (err){
        console.log(err);
        res.status(500).json(err);
    }else {
        console.log(result);
        res.status(200).json(result);

    }
});
}



module.exports = {
    getProyectos,
    createProyecto,
    setLike
};