const cursoRepository = require('../repositories/cursoRepository');

// [CORREÇÃO] Removi o uso de alert() e padronizei a criação e consulta de cursos.
const listarCursos = async (req, res) => {
    try {
        const resultado = await cursoRepository.getAllCursos();
        return res.json(resultado);
    } catch (erro) {
        console.error(erro.message);
        return res.status(500).json({ mensagem: 'Erro interno ao listar cursos.' });
    }
};

const buscarCursosByID = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await cursoRepository.getCursosByID(id);

        if (!curso) {
            return res.status(404).json({ mensagem: 'Curso não encontrado.' });
        }

        return res.json(curso);
    } catch (erro) {
        console.error(erro.message);
        return res.status(500).json({ mensagem: 'Erro interno ao buscar curso.' });
    }
};

const cadastrarCurso = async (req, res) => {
    try {
        const { nome, vagas } = req.body;

        if (!nome || vagas === undefined || Number(vagas) < 0) {
            return res.status(400).json({ mensagem: 'Nome e vagas válidas são obrigatórios.' });
        }

        const novoCurso = await cursoRepository.createCurso(nome, Number(vagas));
        return res.status(201).json(novoCurso);
    } catch (erro) {
        console.error(erro.message);
        return res.status(500).json({ mensagem: 'Erro interno ao cadastrar curso.' });
    }
};

module.exports = { listarCursos, buscarCursosByID, cadastrarCurso };