const turmaRepository = require('../repositories/turmaRepository');

const listarTurmas = async (req, res) => {
    try {
        const resultado = await turmaRepository.getAllTurmas();
        return res.json(resultado);
    } catch (erro) {
        console.error(erro.message);
        return res.status(500).json({ mensagem: 'Erro interno ao listar turmas.' });
    }
};

const buscarTurmasByID = async (req, res) => {
    try {
        const { id } = req.params;
        const turma = await turmaRepository.getTurmasByID(id);

        if (!turma) {
            return res.status(404).json({ mensagem: 'Turma não encontrada.' });
        }

        return res.json(turma);
    } catch (erro) {
        console.error(erro.message);
        return res.status(500).json({ mensagem: 'Erro interno ao buscar turma.' });
    }
};

const cadastrarTurma = async (req, res) => {
    try {
        const { aluno_id, curso_id } = req.body;

        if (!aluno_id || !curso_id) {
            return res.status(400).json({ mensagem: 'aluno_id e curso_id são obrigatórios.' });
        }

        // Alteração: só permite cadastrar turma se o curso existir e ainda tiver vaga.
        const temVagas = await turmaRepository.verificarVagas(curso_id);

        if (temVagas === null) {
            return res.status(404).json({ mensagem: 'Curso não encontrado.' });
        }

        if (!temVagas) {
            return res.status(400).json({ mensagem: 'Não há vagas disponíveis neste curso.' });
        }

        // Alteração: ao cadastrar, o repositório decrementa uma vaga junto com a inserção da turma.
        const novaTurma = await turmaRepository.createTurma(aluno_id, curso_id);

        if (!novaTurma) {
            return res.status(409).json({ mensagem: 'As vagas deste curso foram preenchidas.' });
        }

        return res.status(201).json(novaTurma);
    } catch (erro) {
        console.error(erro.message);
        return res.status(500).json({ mensagem: 'Erro interno ao cadastrar turma.' });
    }
};

module.exports = { listarTurmas, buscarTurmasByID, cadastrarTurma };
