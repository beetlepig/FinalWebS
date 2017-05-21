let DB= require('../../models/Miembros/index');

function getMiembros (req, res) {
    let proyectoID= req.body.id_proyecto;
    console.log(proyectoID);
    DB.getAll(proyectoID , function(error, miembros) {
        if (!error) {
            console.log(miembros);
            res.status(200).json(miembros);

        } else {

            console.log(error);
            res.status(500).json(error);
        }

    });
}

function getTareas (req, res) {
    let membrerCorreo= req.body.memberCorrein;
    let id_proyecto= req.body.id_proyecto;
    console.log(membrerCorreo);
    DB.getAllTareas(membrerCorreo , id_proyecto, function(error, miembros) {
        if (!error) {
            console.log(miembros);
            res.status(200).json(miembros);

        } else {

            console.log(error);
            res.status(500).json(error);
        }

    });
}

let createMiembro = function (req, res) {
    const correo = req.body.correin;
    const roli= req.body.rolin;
    const proyecto= req.body.id_proyecto;

    DB.create(correo, proyecto, roli, function(err, result) {

        if (err) {
            console.log(err);
            res.status(500).json(err);

        }else {
            res.status(200).json(result);

        }
    });

};


module.exports ={
    getMiembros,
    createMiembro,
    getTareas
};