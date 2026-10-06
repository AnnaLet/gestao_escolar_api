const pool = require('../config/db');

// Exibir todos os alunos
const getAllAlunos = async () => {
    const sql = 'SELECT * FROM alunos';
    const resultado = await pool.query(sql);

    return resultado.rows;
};

// Buscar aluno por ID
const getAlunosByID = async (id) => {
    const sql = 'SELECT * FROM alunos WHERE id = $1';
    const resultado = await pool.query(sql, [id]);

    return resultado.rows[0];
};

// Cadastrar aluno
const createAluno = async (nome, email) => {
    const sql = 'INSERT INTO alunos (nome, email) VALUES ($1, $2) RETURNING *';
    const resultado = await pool.query(sql, [nome, email]);

    return resultado.rows[0];
};

module.exports = {getAllAlunos, getAlunosByID, createAluno};