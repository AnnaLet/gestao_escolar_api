const pool = require('../config/db');

// Exibir todas as turmas
const getAllTurmas = async () => {
    const sql = 'SELECT * FROM turmas';
    const resultado = await pool.query(sql);

    return resultado.rows;
};

// Cadastrar turmas
const createTurmas = async (aluno_id, curso_id) => {
    const sql = 'INSERT INTO turmas (aluno_id, curso_id) VALUES ($1, $2) RETURNING *';
    const resultado = await pool.query(sql, [aluno_id, curso_id]);

    return resultado.rows[0];
};

module.exports = {getAllTurmas, createTurmas};