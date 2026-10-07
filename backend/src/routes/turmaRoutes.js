const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turmaController');

// [CORREÇÃO] Ajustei o nome da função do controller para manter a rota funcional.
router.get('/', turmaController.listarTurmas);
router.get('/:id', turmaController.buscarTurmasByID);
router.post('/', turmaController.cadastrarTurma);

module.exports = router;