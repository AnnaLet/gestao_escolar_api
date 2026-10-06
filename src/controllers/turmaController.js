const turmaRepository = require('../repositories/turmaRepository');

// Listar turmas
const listarTurmas = async (req, res) => {
    try{
        const resultado = await turmaRepository.getAllTurmas();
        res.json(resultado);
    } catch (erro) {
        console.error(erro.message)
        res.status(500).json({ mensagem:'Error Interno.' });
    }
};

const cadastrarTurma = async (req, res) => {
    try {
        const { aluno_id, curso_id} = req.body;

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
module.exports = { listarTurmas, cadastrarTurma};