const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authentication');
const usuarios_controller = require('../controllers/usuarios.controller');

router.post('/ingresar_usuario', usuarios_controller.ingresar_usuario);
router.post('/registrar_usuario', auth.ensureAuth, usuarios_controller.registrar_usuario);

module.exports = router;