const suministros_controller = {};
const mysql = require('../database/database');

suministros_controller.registrar_suministro = function(req,res){
    const params = req.body;
    const codigo_suministro = params.codigo_suministro;
    const fecha_instalacion = params.fecha_instalacion;
    const sql = 'call sp_insert_suministro(?,?);';

    mysql.query(sql,[codigo_suministro,fecha_instalacion], (err,suministro)=>{
        if (!err) {
            res.status(200).send({status:'Error', message:'Se registro correctamente',code:'400'});
        } else {
            res.status(400).send({status:'Error', error:err,code:'400'});
        }
    });
}
module.exports = suministros_controller;