const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authentication');
const clientes_controller = require('../controllers/clientes.controller');

router.post('/registrar_cliente', auth.ensureAuth ,clientes_controller.registrar_cliente);
router.post('/modificar_cliente', auth.ensureAuth ,clientes_controller.modificar_cliente);

module.exports = router;