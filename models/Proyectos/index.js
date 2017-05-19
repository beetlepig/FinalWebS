let db = require('../../DBMYSQL/index');


exports.getAll = function(creador,done) {
    db.get().getConnection(function (err,connection) {
        if (err){
            connection.release();
            console.log(err);
            return done(err,null);
        } else {
            connection.query('SELECT * FROM proyecto WHERE `creador` = ?',creador, function (err, rows)  {
                if (err) {
                    return done(err);
                }else {
                    done(null, rows);
                }
            });

            connection.release();
        }

    });

};


exports.create = function(nombre, creador , done) {
    let values= [nombre, creador];

    db.get().getConnection(function (err,connection) {
        if (err){
            connection.release();
            console.log(err);
            return done(err);
        } else {
            connection.query('INSERT INTO proyecto (nombre, creador) VALUES(?, ?)', values, function(err, result) {
                if (err) {
                    return done(err);
                }
                console.log(err);
                done(null, result.insertId);
            });

            connection.release();
        }

    });
};


