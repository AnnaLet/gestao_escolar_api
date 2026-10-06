const alunoRepository = require('../repositories/alunoRepository');

// Listar alunos

const listarAlunos = async (req, res) => {
    try{
        const resultado = await alunoRepository.getAllAlunos(); 
        res.json(resultado);
    } catch (erro) {
        console.error(erro.message)
        res.status(500).json({ mensagem:'Error Interno.' });
    }
};
// Buscar aluno por ID

const buscarAlunosByID = async (req, res) => {
    try {
        const id = req.params.id;
        const aluno = await alunoRepository.getAlunosByID(id);

        if (!aluno) {
            return res.status(404).json({ mensagem: 'aluno não encontrado.' });
        }

        return res.json(aluno);
    } catch (erro) {
        console.error(erro.message);
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
};

// Criar aluno
const cadastrarAluno = async (req, res) => {
    try {
        const { nome, email} = req.body;

        if (!nome || !email) {
            return res.status(400).json({ mensagem: 'Nome e email são obrigatórios.' });
        }

        const novoAluno = await alunoRepository.createAluno(nome, email);
        return res.status(201).json(novoAluno);
    } catch (erro) {
        console.error(erro.message);
        return res.status(500).json({ mensagem: 'Erro interno ao cadastrar aluno.' });
    }
};

module.exports = { listarAlunos, buscarAlunosByID, cadastrarAluno};