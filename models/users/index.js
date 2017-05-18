let db = require('../../DBMYSQL/index');

exports.create = function(nombre, apellido, nickname, pass, correo , img ,pais, color, done) {
    let values = [nickname, nombre, apellido, correo, pass, pais, img, color];

    db.get().getConnection(function (err,connection) {
        if (err){
            connection.release();
            console.log(err);
            return done(err);
        } else {
            connection.query('INSERT INTO user (username, name, lastname, email, password, pais, profilepic, color) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', values, function(err, result) {
                if (err) {
                    return done(err);
                } else {
                    done(null, result.insertId);
                }
            });

            connection.release();
        }

    });
};

exports.getAll = function(done) {
    db.get().getConnection(function (err,connection) {
        if (err){
            connection.release();
            console.log(err);
            return done(err,null);
        } else {
            connection.query('SELECT * FROM user', function (err, rows)  {
                if (err)
                    return done(err);
                done(null, rows);
            });

            connection.release();
        }

    });

};