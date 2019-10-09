const usuarios_controller = {};
const mysql = require('../database/database');
const bcrypt = require('bcrypt');
const password_abstract = require('../utils/password');
const mail = require('../utils/mail');
const jwt = require('../middlewares/jwt');

usuarios_controller.ingresar_usuario = function(req,res){
    const params = req.body;
    const correo_usuario = params.correo_usuario;
    const password_usuario = params.password_usuario;
    const sql = 'call sp_get_datos_usuario(?);';
    mysql.query(sql, correo_usuario, (err,usuario)=>{
        if (!err) {
            if (usuario[0][0] != undefined) {
                bcrypt.compare(password_usuario, usuario[0][0].password_usuario, function(err_bcrypt,res_bcrypt){
                    if (res_bcrypt) {
                        res.status(200).send({ status:'Success', token: jwt.crearToken(usuario[0][0]), code:'200'});
                    } else {
                        res.status(400).send({status:'Error', message:'Contraseña incorrecta',code:'400'});
                    }
                });
            }else{
                res.status(400).send({status:'Error', error:'Usuario no existe',code:'400'});
            }
        }else{
            res.status(400).send({status:'Error', error:err,code:'400'});
        }
    });
}

usuarios_controller.registrar_usuario = function(req,res){
    const params = req.body;
    const correo_usuario = params.correo_usuario;
    const password_usuario = password_abstract.random();
    const saltos = password_abstract.numero_saltos();
    const sql = 'call sp_insert_usuario(?,?);';
    
    bcrypt.hash(password_usuario,saltos,function(err_hash,pass_hash){
        if (!err_hash) {
            mysql.query(sql, [correo_usuario,pass_hash], (err_2,usuario)=>{
                if (!err_2) {
                    mail.usuario_registro('Bienvenido',correo_usuario,password_usuario);
                    res.status(200).send({status:'200', message:'Registrado correctamente', code:'200'});
                } else {
                    res.status(400).send({status:'Error', error:err_2,code:'400'});
                }
            });
        } else {
            res.status(400).send({status:'Error', error:err_hash,code:'400'});
        }
    });
}

module.exports = usuarios_controller;