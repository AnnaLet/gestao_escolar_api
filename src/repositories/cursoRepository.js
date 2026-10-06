const pool = require('../config/db');

// Exibir todos os cursos
const getAllCursos = async () => {
    const sql = 'SELECT * FROM cursos';
    const resultado = await pool.query(sql);

    return resultado.rows;
};

// Buscar curso por ID
const getCursosByID = async (id) => {
    const sql = 'SELECT * FROM cursos WHERE id = $1';
    const resultado = await pool.query(sql, [id]);

    return resultado.rows[0];
};


// Editar vagas 
const editarVagas = async (id, vagas) => {
    const sql = 'UPDATE cursos SET vagas = vagas - 1 WHERE id = $1 RETURNING *';
    const resultado = await pool.query(sql, [id, vagas]);

    return resultado.rows[0];
};

// Verificar vagas no curso 
const verificarVagas = async (id, vagas) => {
    const sql = 'SELECT vagas FROM cursos WHERE id = $1';
    const resultado = await pool.query(sql, [id, vagas]);
    
    if(resultado.vagas > 0) {
        return resultado.rows[0];
    } else {
        editarVagas();
    }

    return resultado.rows[0];

    
};

// Cadastrar curso
const createCurso = async (nome, vagas) => {
    const sql = 'INSERT INTO cursos (nome, vagas) VALUES ($1, $2) RETURNING *';
    const resultado = await pool.query(sql, [nome, vagas]);

    return resultado.rows[0];
};

module.exports = {getAllCursos, getCursosByID, verificarVagas, createCurso};