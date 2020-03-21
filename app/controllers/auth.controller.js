const {queryLogIn, queryRegister} = require('../utils/mongoQuerys'),
    express = require('express'),
    jwt = require('jsonwebtoken');

exports.verifyToken = (app) => {
    const verifyToken = express.Router();
    verifyToken.use((req, res, next) => {
        const token = req.headers['authorization'].substr(7);

        if (token) {
            jwt.verify(token, app.get('masterKey'), (err, decoded) => {
                if (err) return res.json({mensaje: 'Token inválida'});
                else {
                    if (decoded.role === "admin") next();
                    else res.send('No tienes permisos de administrador');
                }
            });
        } else res.send({mensaje: 'Token no proveída.'});
    });
    return verifyToken;
};

exports.logIn = (req, res) => {
    const makeJWT = (items) => {
        if (items.length > 0) {
            const payload = {role: items[0].role, DNI: items[0].DNI};
            const token = jwt.sign(payload, app.get('masterKey'), {expiresIn: 1500});
            res.json({token: token});
        } else
            res.json({mensaje: "Invalid username"});
    };

    queryLogIn(req.body.DNI, req.body.password, makeJWT);
};

exports.register = (req, res) => {
    queryRegister(req.body.DNI, req.body.role, req.body.password);
    res.json({mensaje: "Registro OK"});
};

