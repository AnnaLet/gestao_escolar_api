const pool = require('../config/db');

// [CORREÇÃO] Removi execução automática no carregamento do módulo e padronizei as funções de curso.
const getAllCursos = async () => {
    const sql = 'SELECT * FROM cursos';
    const resultado = await pool.query(sql);

    return resultado.rows;
};

const getCursosByID = async (id) => {
    const sql = 'SELECT * FROM cursos WHERE id = $1';
    const resultado = await pool.query(sql, [id]);

    return resultado.rows[0];
};

const editarVagas = async (id) => {
    const sql = 'UPDATE cursos SET vagas = vagas - 1 WHERE id = $1 RETURNING *';
    const resultado = await pool.query(sql, [id]);

    return resultado.rows[0];
};

const verificarVagas = async (id) => {
    const sql = 'SELECT * FROM cursos WHERE id = $1';
    const resultado = await pool.query(sql, [id]);
    const curso = resultado.rows[0];

    if (!curso) {
        return false;
    }

    return Number(curso.vagas) > 0;
};

const createCurso = async (nome, vagas) => {
    const sql = 'INSERT INTO cursos (nome, vagas) VALUES ($1, $2) RETURNING *';
    const resultado = await pool.query(sql, [nome, vagas]);

    return resultado.rows[0];
};

module.exports = { getAllCursos, getCursosByID, editarVagas, verificarVagas, createCurso };