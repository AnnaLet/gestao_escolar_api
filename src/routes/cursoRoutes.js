const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');

router.get('/', cursoController.listarCursos);
router.get('/:id', cursoController.buscarCursosByID);
router.post('/', cursoController.cadastrarCurso);

module.exports = router;