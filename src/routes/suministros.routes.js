const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authentication');
const suministros_controller = require('../controllers/suministros.controller');

router.post('/registrar_suministro', auth.ensureAuth, suministros_controller.registrar_suministro);

module.exports = router;