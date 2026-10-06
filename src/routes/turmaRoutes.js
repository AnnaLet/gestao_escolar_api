const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turmaController');

router.get('/', turmaController.listarTurmas);
router.get('/:id', turmaController.buscarTurmasbyID);
router.post('/', turmaController.cadastrarTurma);

module.exports = router;