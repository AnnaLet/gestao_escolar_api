const pool = require('../config/db');

// Alteração: lista as turmas com os nomes do aluno e do curso usando as relações existentes.
const getAllTurmas = async () => {
    const sql = `
        SELECT
            turmas.id AS turma_id,
            alunos.nome AS aluno,
            cursos.nome AS curso,
            turmas.data_matricula AS data_matricula
        FROM turmas
        INNER JOIN alunos ON turmas.aluno_id = alunos.id
        INNER JOIN cursos ON turmas.curso_id = cursos.id
        ORDER BY data_matricula DESC
    `;

    const resultado = await pool.query(sql);
    return resultado.rows;
};

const getTurmasByID = async (id) => {
    const sql = `
        SELECT
            turmas.id AS turma_id,
            alunos.nome AS aluno,
            cursos.nome AS curso,
            turmas.data_matricula AS data_matricula
        FROM turmas
        INNER JOIN alunos ON turmas.aluno_id = alunos.id
        INNER JOIN cursos ON turmas.curso_id = cursos.id
        WHERE turmas.id = $1
    `;

    const resultado = await pool.query(sql, [id]);
    return resultado.rows[0];
};

// Alteração: verifica se o curso existe e informa se ainda há vaga disponível.
const verificarVagas = async (curso_id) => {
    const sql = 'SELECT vagas FROM cursos WHERE id = $1';
    const resultado = await pool.query(sql, [curso_id]);

    if (resultado.rows.length === 0) {
        return null;
    }

    return Number(resultado.rows[0].vagas) > 0;
};

// Alteração: baixa uma vaga e cria a turma numa única operação atômica, sem ultrapassar o limite.
const createTurma = async (aluno_id, curso_id) => {
    const sql = `
        WITH vaga_reservada AS (
            UPDATE cursos
            SET vagas = vagas - 1
            WHERE id = $2 AND vagas > 0
            RETURNING id
        )
        INSERT INTO turmas (aluno_id, curso_id)
        SELECT $1, id FROM vaga_reservada
        RETURNING *
    `;
    const resultado = await pool.query(sql, [aluno_id, curso_id]);

    return resultado.rows[0];
};


module.exports = { getAllTurmas, getTurmasByID, verificarVagas, createTurma };