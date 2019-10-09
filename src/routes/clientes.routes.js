const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authentication');
const clientes_controller = require('../controllers/clientes.controller');

router.post('/registrar_cliente', auth.ensureAuth ,clientes_controller.registrar_cliente);
router.post('/modificar_cliente', auth.ensureAuth ,clientes_controller.modificar_cliente); 
router.post('/deshabilitar_cliente', auth.ensureAuth, clientes_controller.deshabilitar_cliente);

router.get('/listar_clientes', auth.ensureAuth, clientes_controller.listar_cliente);
router.get('/listar_cliente_dni', auth.ensureAuth, clientes_controller.listar_cliente_dni);
router.get('/reporte_cliente', auth.ensureAuth, clientes_controller.reporte_cliente);
module.exports = router;
