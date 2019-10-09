const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'sis_prod';

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization) {
        return res.status(401).send({
            status : 'error',
            message: 'Token no encontrado',
            code: '401'
        });
    }
    var token = req.headers.authorization;
    const payload = jwt.decode(token, secret);
    try {    
        if(payload.exp <= moment().unix()){
            return res.status(403).send({
                status : 'error',
                message: 'Token ha expirado',
                code: '403'
            });
        }
    } catch (ex) {
        console.log(token);
        return res.status(403).send({
            status : 'error',
            message: 'Token no válido',
            code: '403'
        });
    }
    req.user = payload;
    next();
};
