// Alteração: conecta os formulários e painéis à API de alunos, cursos e turmas.
const state = { students: [], courses: [], classes: [] };
const pageDetails = {
    dashboard: ['VISÃO GERAL', 'Uma nova fase começa', 'agora.', 'Acompanhe o que acontece no seu espaço educacional.'],
    students: ['ALUNOS', 'Toda jornada começa', 'com alguém.', 'Conheça e cadastre quem faz parte da sua comunidade.'],
    courses: ['CURSOS', 'Conhecimento abre', 'novos mundos.', 'Organize os cursos e acompanhe as vagas disponíveis.'],
    classes: ['TURMAS', 'Juntos, vocês vão', 'mais longe.', 'Vincule alunos e cursos para iniciar uma nova jornada.']
};
const viewNames = { dashboard: 'dashboard', students: 'alunos', courses: 'cursos', classes: 'turmas' };

const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

async function api(path, options = {}) {
    const response = await fetch(path, {
        ...options,
        headers: { 'Content-Type': 'application/json', ...options.headers }
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.mensagem || 'Não foi possível concluir a solicitação.');
    return data;
}

function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.toggle('error', isError);
    toast.classList.add('visible');
    clearTimeout(showToast.timeout);
    showToast.timeout = setTimeout(() => toast.classList.remove('visible'), 3600);
}

function setView(view) {
    document.querySelectorAll('.view-panel').forEach((panel) => panel.classList.toggle('active', panel.id === `view-${view}`));
    document.querySelectorAll('.nav-link').forEach((button) => button.classList.toggle('active', button.dataset.view === view));
    const [breadcrumb, firstLine, accentLine, description] = pageDetails[view];
    document.getElementById('breadcrumb-current').textContent = breadcrumb;
    document.getElementById('page-title').innerHTML = `${firstLine} <span>${accentLine}</span>`;
    document.getElementById('page-description').textContent = description;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderDashboard() {
    document.getElementById('stat-students').textContent = state.students.length;
    document.getElementById('stat-courses').textContent = state.courses.length;
    document.getElementById('stat-classes').textContent = state.classes.length;
    document.getElementById('stat-seats').textContent = state.courses.reduce((total, course) => total + Math.max(0, Number(course.vagas) || 0), 0);

    const featured = [...state.courses].sort((a, b) => (Number(b.vagas) || 0) - (Number(a.vagas) || 0)).slice(0, 4);
    document.getElementById('dashboard-courses').innerHTML = featured.length
        ? featured.map((course, index) => {
            const colors = ['orange', 'blue', 'purple', 'green'];
            return `<div class="course-row"><span class="course-symbol ${colors[index]}">${['▤', '◇', '✦', '▧'][index]}</span><span class="course-info"><strong>${escapeHTML(course.nome)}</strong><small>Jornada de aprendizagem</small></span><span class="seat-pill ${Number(course.vagas) > 0 ? 'has-seats' : 'no-seats'}">${Number(course.vagas) || 0} vagas</span></div>`;
        }).join('')
        : '<div class="empty-state">Nenhum curso cadastrado ainda. Comece criando o primeiro!</div>';

    document.getElementById('dashboard-classes').innerHTML = renderClassTable(state.classes.slice(0, 5));
}

function renderClassTable(classes) {
    if (!classes.length) return '<div class="empty-state">Nenhuma turma cadastrada ainda.</div>';
    return `<table><thead><tr><th>ALUNO</th><th>CURSO</th><th>DATA</th><th>STATUS</th></tr></thead><tbody>${classes.map((item) => `<tr><td><span class="table-avatar">${escapeHTML(String(item.aluno || '?').slice(0, 1).toUpperCase())}</span>${escapeHTML(item.aluno)}</td><td>${escapeHTML(item.curso)}</td><td>${item.data_matricula ? escapeHTML(new Date(item.data_matricula).toLocaleDateString('pt-BR')) : '—'}</td><td><span class="status-pill"><i></i> Ativa</span></td></tr>`).join('')}</tbody></table>`;
}

function renderRecords() {
    document.getElementById('student-count').textContent = state.students.length;
    document.getElementById('course-count').textContent = state.courses.length;
    document.getElementById('class-count').textContent = state.classes.length;

    document.getElementById('student-list').innerHTML = state.students.length
        ? state.students.map((student) => `<div class="record-row"><span class="record-avatar">${escapeHTML(String(student.nome || '?').slice(0, 1).toUpperCase())}</span><span class="record-copy"><strong>${escapeHTML(student.nome)}</strong><small>${escapeHTML(student.email)}</small></span><span class="record-id">#${escapeHTML(student.id)}</span></div>`).join('')
        : '<div class="empty-state">Nenhum aluno por aqui ainda.</div>';

    document.getElementById('course-list').innerHTML = state.courses.length
        ? state.courses.map((course) => `<div class="record-row"><span class="record-avatar course-avatar">▤</span><span class="record-copy"><strong>${escapeHTML(course.nome)}</strong><small>Curso de aprendizagem</small></span><span class="seat-pill ${Number(course.vagas) > 0 ? 'has-seats' : 'no-seats'}">${Number(course.vagas) || 0} vagas</span></div>`).join('')
        : '<div class="empty-state">Nenhum curso cadastrado ainda.</div>';

    document.getElementById('class-list').innerHTML = state.classes.length
        ? state.classes.map((item) => `<div class="record-row"><span class="record-avatar class-avatar">▦</span><span class="record-copy"><strong>${escapeHTML(item.aluno)}</strong><small>${escapeHTML(item.curso)} · ${item.data_matricula ? escapeHTML(new Date(item.data_matricula).toLocaleDateString('pt-BR')) : 'Inscrição ativa'}</small></span><span class="status-pill"><i></i> Ativa</span></div>`).join('')
        : '<div class="empty-state">Nenhuma turma cadastrada ainda.</div>';

    const studentOptions = state.students.map((student) => `<option value="${escapeHTML(student.id)}">${escapeHTML(student.nome)}</option>`).join('');
    document.getElementById('class-student').innerHTML = `<option value="">Selecione um aluno</option>${studentOptions}`;
    const availableCourses = state.courses.filter((course) => Number(course.vagas) > 0);
    document.getElementById('class-course').innerHTML = `<option value="">${availableCourses.length ? 'Selecione um curso' : 'Nenhum curso com vagas'}</option>${availableCourses.map((course) => `<option value="${escapeHTML(course.id)}">${escapeHTML(course.nome)} · ${Number(course.vagas)} vagas</option>`).join('')}`;
    document.getElementById('class-course').disabled = availableCourses.length === 0;
}

// Alteração: atualiza todos os indicadores e opções usando exclusivamente os dados atuais do backend.
async function loadData() {
    const [students, courses, classes] = await Promise.all([api('/alunos'), api('/cursos'), api('/turmas')]);
    state.students = students;
    state.courses = courses;
    state.classes = classes;
    renderDashboard();
    renderRecords();
}

function bindForm(formId, path, prepare, successMessage, afterSuccess) {
    document.getElementById(formId).addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const button = form.querySelector('button[type="submit"]');
        button.disabled = true;
        try {
            await api(path, { method: 'POST', body: JSON.stringify(prepare(new FormData(form))) });
            form.reset();
            await loadData();
            showToast(successMessage);
            if (afterSuccess) afterSuccess();
        } catch (error) {
            showToast(error.message, true);
        } finally {
            button.disabled = false;
        }
    });
}

document.querySelectorAll('.nav-link').forEach((button) => button.addEventListener('click', () => setView(button.dataset.view)));
document.querySelectorAll('[data-go]').forEach((button) => button.addEventListener('click', () => setView(button.dataset.go)));
document.getElementById('refresh-button').addEventListener('click', () => loadData().then(() => showToast('Painel atualizado.')).catch((error) => showToast(error.message, true)));

bindForm('student-form', '/alunos', (data) => ({ nome: data.get('nome').trim(), email: data.get('email').trim() }), 'Aluno cadastrado com sucesso!');
bindForm('course-form', '/cursos', (data) => ({ nome: data.get('nome').trim(), vagas: Number(data.get('vagas')) }), 'Curso cadastrado com sucesso!');
bindForm('class-form', '/turmas', (data) => ({ aluno_id: data.get('aluno_id'), curso_id: data.get('curso_id') }), 'Turma cadastrada! Uma vaga foi utilizada.');

document.getElementById('today-label').textContent = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date()).replace('.', '');
loadData().catch((error) => {
    showToast(`Não foi possível carregar os dados: ${error.message}`, true);
    document.querySelectorAll('.empty-state').forEach((element) => {
        if (element.textContent.includes('Carregando')) element.textContent = 'Inicie o backend para carregar os dados.';
    });
});
