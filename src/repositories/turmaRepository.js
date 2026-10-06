const pool = require('../config/db');

// Exibir todas as turmas
const getAllTurmas = async () => {
    const sql = `
        SELECT
            turmas.id AS turma_id,
            alunos.nome AS Aluno,
            produtos.nome AS Curso 
        FROM turmas
        INNER JOIN alunos ON turmas.aluno_id = aluno.id
        INNER JOIN cursos ON turmas.curso_id = curso.id
        ORDER BY turmas.data_matricula DESC;`
    ;
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