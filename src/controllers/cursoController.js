const cursoRepository = require('../repositories/cursoRepository');

// Listar curso
const listarCursos = async (req, res) => {
    try{
        const resultado = await cursoRepository.getAllCursos();
        console.log(resultado);
        res.json(resultado);
    } catch (erro) {
        console.error(erro.message)
        res.status(500).json({ mensagem:'Error Interno.' });
    }
};

const buscarCursosByID = async (req, res) => {
    try {
        const id = req.params.id;
        const curso = await cursoRepository.getCursosByID(id);

        if (!curso) {
            alert("Curso não encontrado");
            return res.status(404).json({ mensagem: 'Curso não encontrado.' });
        }

        return res.json(curso);
    } catch (erro) {
        console.error(erro.message);
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
};


const cadastrarCurso = async (req, res) => {
    try {
        const { nome, vagas} = req.body;

        if (!nome || vagas === undefined) {
            return res.status(400).json({ mensagem: 'Campos obrigatórios não preenchidos.' });
        }

        const novoCurso = await cursoRepository.createCurso(nome, vagas);
        return res.status(201).json(novoCurso);
    } catch (erro) {
        console.error(erro.message);
        return res.status(500).json({ mensagem: 'Erro interno ao cadastrar curso.' });
    }
};
module.exports = { listarCursos, buscarCursosByID, cadastrarCurso};