const express = require('express');
const cors = require('cors');
const path = require('path');

const alunosRoutes = require('./routes/alunoRoutes');
const cursosRoutes = require('./routes/cursoRoutes');
const turmasRoutes = require('./routes/turmaRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/alunos', alunosRoutes);
app.use('/cursos', cursosRoutes);
app.use('/turmas', turmasRoutes);

// Alteração: disponibiliza o frontend estático na raiz, usando o mesmo servidor da API.
app.use(express.static(path.resolve(__dirname, '../../frontend')));

module.exports = app;