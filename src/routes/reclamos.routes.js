const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authentication');
const reclamos_controller = require('../controllers/reclamos.controller');

router.get('/listar_reclamos', auth.ensureAuth ,reclamos_controller.listar_reclamos);
router.get('/listar_reclamo_dni', auth.ensureAuth ,reclamos_controller.listar_reclamo_dni);

router.post('/responder_reclamo', auth.ensureAuth ,reclamos_controller.responder_reclamo);
router.post('/agregar_reclamo', auth.ensureAuth ,reclamos_controller.agregar_reclamo);
module.exports = router;