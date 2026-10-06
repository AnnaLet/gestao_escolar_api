const express = require('express');
const cors = require('cors');

const alunosRoutes = require('./routes/alunoRoutes');
const cursosRoutes = require('./routes/cursoRoutes');
const turmasRoutes = require('./routes/turmaRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/alunos', alunosRoutes);
app.use('/cursos', cursosRoutes);
app.use('/turmas', turmasRoutes);

module.exports = app;