const reclamos_controller = {};
const mysql = require('../database/database');

reclamos_controller.listar_reclamos = function(req,res){
    const sql = 'call sp_get_todos_reclamos();';
    mysql.query(sql, (err,reclamos)=>{
        if (!err) {
            res.status(200).send({status:'Success', reclamos:reclamos[0],code:'200'});
        } else {
            res.status(400).send({status:'Error', error:err,code:'400'});
        }
    });
};

reclamos_controller.listar_reclamo_dni = function(req,res){
    const params = req.query;
    const dni_cliente = params.dni_cliente;
    const sql = 'call sp_get_dni_reclamo(?);';

    mysql.query(sql, dni_cliente, (err,reclamo)=>{
        if (!err) {
            if (reclamo[0][0].mensaje == '1') {
                res.status(200).send({status:'Success', reclamos:reclamo[0],code:'200'});
            } else {
                res.status(400).send({status:'Success', message:reclamo[0][0].mensaje,code:'400'});
            }
            
        } else {
            res.status(400).send({status:'Error', error:err,code:'400'});
        }
    });
}

reclamos_controller.responder_reclamo = function(req,res){
    const params = req.body;
    const id_reclamo = params.id_reclamo;
    const respuesta_reclamo = params.respuesta_reclamo;
    const sql = 'call sp_update_respuesta_reclamo(?,?);';

    mysql.query(sql, [id_reclamo,respuesta_reclamo], (err,reclamo)=>{
        if (!err) {
            res.status(200).send({status:'Error', message:'Se modifico correctamenete',code:'200'});
        } else {
            res.status(400).send({status:'Error', error:err,code:'400'});
        }
    });
}

reclamos_controller.agregar_reclamo = function(req,res){
    const params = req.body;
    const dni_cliente = params.dni_cliente;
    const tema_reclamo = params.tema_reclamo;
    const comentario_reclamo = params.tema_reclamo;
    const sql = 'call sp_insert_reclamo(?,?,?);';

    mysql.query(sql, [dni_cliente, tema_reclamo, comentario_reclamo], (err,reclamo)=>{
        if (!err) {
            if (reclamo[0][0].mensaje == 1) {
                res.status(200).send({status:'Success', message:'Registrado correctamente',code:'200'});
            }else{
                res.status(400).send({status:'Error', message:reclamo[0][0].mensaje,code:'400'});
            }
        } else {
            res.status(400).send({status:'Error', error:err,code:'400'});
        }
    });
    
}
module.exports = reclamos_controller;