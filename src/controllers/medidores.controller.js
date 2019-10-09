const medidores_controller = {};
const mysql = require('../database/database');


medidores_controller.registrar_medidor = function(req,res){
    const params = req.body;
    const dni_cliente = params.dni_cliente;
    const codigo_suministro = params.codigo_suministro;
    const tipo_medidor = params.tipo_medidor;
    const modelo_medidor = params.modelo_medidor;
    const fecha_instalacion = params.fecha_instalacion;
    const codigo_medidor = params.codigo_medidor;
    const sql = 'call sp_insert_medidor(?,?,?,?,?,?);'; 
    mysql.query(sql, [dni_cliente,codigo_suministro,tipo_medidor,modelo_medidor, fecha_instalacion, codigo_medidor], (err,medidor)=>{
        if (!err) {
            if (medidor[0][0].mensaje == 3) {
                res.status(200).send({status:'Success', message:'Se registro con exito',code:'200'});
            }else{
                if (medidor[0][0].mensaje == 2){
                    res.status(400).send({status:'Error', message:'El suministro no existe',code:'400'});
                }
                if (medidor[0][0].mensaje == 1) {
                    res.status(400).send({status:'Error', message:'El usuario no existe',code:'400'});
                }
           }
        } else {
            res.status(400).send({status:'Error', error:err,code:'400'});
        }
    });
};

medidores_controller.reporte_medidor = function(req,res){
    const params = req.query;
    const codigo_medidor = params.codigo_medidor;
    const sql = 'call sp_get_reporte_medidor(?);';

    mysql.query(sql, codigo_medidor, (err,medidor)=>{
        if (!err) {
            res.status(200).send({status:'Success', reporte:medidor[0],code:'200'});
        }else{
            res.status(400).send({status:'Error', error:err,code:'400'});
        }
    })
};

medidores_controller.reporte_medidor_distrito = function(req,res){
    const params = req.query;
    const distrito_medidor = params.distrito_medidor;
    const sql = 'call sp_get_reporte_distrito_medidor(?);';

    mysql.query(sql, distrito_medidor, (err,medidor)=>{
        if (!err) {
            res.status(200).send({status:'Success', reporte:medidor[0],code:'200'});
        }else{
            res.status(400).send({status:'Error', error:err,code:'400'});
        }
    })
}

medidores_controller.reporte_medidor_tipo = function(req,res){
    const params = req.query;
    const tipo_medidor = params.tipo_medidor;
    const sql = 'call sp_get_reporte_tipo_medidor(?);';

    mysql.query(sql, tipo_medidor, (err,medidor)=>{
        if (!err) {
            res.status(200).send({status:'Success', reporte:medidor[0],code:'200'});
        }else{
            res.status(400).send({status:'Error', error:err,code:'400'});
        }
    })
}
module.exports = medidores_controller;
