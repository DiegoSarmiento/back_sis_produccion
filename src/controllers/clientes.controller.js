const clientes_controller = {};
const mysql = require('../database/database');

clientes_controller.registrar_cliente = function(req,res){
    const params = req.body;
    const dni_cliente = params.dni_cliente;
    const nombre_cliente = params.nombre_cliente;
    const apepat_cliente = params.apepat_cliente;
    const apemat_cliente = params.apemat_cliente;
    const telefono_cliente = params.telefono_cliente;
    const direccion_cliente = params.direccion_cliente;
    const distrito_cliente = params.distrito_cliente;
    const sql = 'call sp_insert_cliente(?,?,?,?,?,?,?);';

    mysql.query(sql, [dni_cliente,nombre_cliente,apepat_cliente, apemat_cliente, telefono_cliente, direccion_cliente, distrito_cliente], (err,cliente)=>{
        if (!err) {
            res.status(200).send({status:'Success', message:'Se ingreso correctamente', code:'200'});
        } else {
            res.status(400).send({status:'Error', error:err,code:'400'});
        }
    });
};

clientes_controller.modificar_cliente = function(req,res){
    const params = req.body;
    const id_cliente = params.id_cliente;
    const dni_cliente = params.dni_cliente;
    const nombre_cliente = params.nombre_cliente;
    const apepat_cliente = params.apepat_cliente;
    const apemat_cliente = params.apemat_cliente;
    const telefono_cliente = params.telefono_cliente;
    const direccion_cliente = params.direccion_cliente;
    const distrito_cliente = params.distrito_cliente;
    const sql = 'call sp_update_cliente(?,?,?,?,?,?,?);';
    mysql.query(sql, [id_cliente,dni_cliente,nombre_cliente,apepat_cliente, apemat_cliente, telefono_cliente, direccion_cliente, distrito_cliente], (err,cliente)=>{
        if (!err) {
            res.status(200).send({status:'Success', message:'Se modifico correctamente', code:'200'});
        } else {
            res.status(400).send({status:'Error', error:err,code:'400'});
        }
    });
}

clientes_controller.deshabilitar_cliente = function(req,res){
    const params = req.body;
    const id_cliente = params.id_cliente;
    const estado = params.estado;
    const sql = 'call sp_update_estado_cliente(?,?);';
    mysql.query(sql, [id_cliente,estado], (err,cliente)=>{
        if (!err) {
            res.status(200).send({status:'Success', message:'Se modifico correctamente',code:'200'});
        } else {
            res.status(400).send({status:'Error', error:err,code:'400'});
        }
    });
}

clientes_controller.listar_cliente = function(req,res){
    const sql = 'call sp_get_todos_clientes();';
    mysql.query(sql, (err,clientes)=>{
        if (!err) {
            res.status(200).send({status:'Success', clientes:clientes[0], code:'200'});
        } else {
            res.status(400).send({status:'Error', error:err,code:'400'});
        }
    });
}

clientes_controller.listar_cliente_dni = function(req,res){
    const params = req.query;
    const dni_cliente = params.dni_cliente;
    const sql = 'call sp_get_dni_cliente(?);';
    mysql.query(sql, dni_cliente, (err, cliente)=>{
        if (!err) {
            res.status(200).send({status:'Success', clientes:cliente[0], code:'200'});
        } else {
            res.status(400).send({status:'Error', error:err,code:'400'});
        }
    });
}

clientes_controller.reporte_cliente = function(req,res){
    const params = req.query;
    const dni_cliente = params.dni_cliente;
    const sql = 'call sp_get_reporte_cliente(?);';
    mysql.query(sql, dni_cliente, (err,reporte)=>{
        if (!err) {
            if (reporte[0][0].mensaje == 1 ) {
                
                res.status(200).send({status:'Success', reporte:reporte[0][0], code:'200'});
            } else {
                res.status(400).send({status:'Error', error:reporte[0][0].mensaje,code:'400'});
            }
        } else {
            res.status(400).send({status:'Error', error:err,code:'400'});
        }
    });
}

module.exports = clientes_controller;