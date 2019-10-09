const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authentication');
const medidores_controller = require('../controllers/medidores.controller');

router.post('/registrar_medidor', auth.ensureAuth,medidores_controller.registrar_medidor);
router.get('/reporte_medidor', auth.ensureAuth,medidores_controller.reporte_medidor);
router.get('/reporte_medidor_distrito', auth.ensureAuth,medidores_controller.reporte_medidor_distrito);
router.get('/reporte_medidor_tipo', auth.ensureAuth,medidores_controller.reporte_medidor_tipo);


module.exports = router;