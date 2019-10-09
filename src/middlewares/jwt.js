const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'sis_prod';

exports.crearToken = function(usuario){
    const payload = {
        id_usuario: usuario.id_usuario,
        iat: moment().unix(),
        exp: moment().add(30, 'dias').unix
    };
    return jwt.encode(payload, secret);
};

exports.decodificarToken = function(token){
    const payload = jwt.decode(token, secret);
    return payload;
};
