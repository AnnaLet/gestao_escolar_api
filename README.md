# Senac Play — Gestão Educacional

Painel web de gestão educacional com cadastro de alunos, cursos e turmas.

## Estrutura

- `frontend/`: interface responsiva, com identidade visual inspirada nas cores do Senac e elementos pixel animados.
- `backend/`: API Express e persistência PostgreSQL.

## Executar

1. Configure as credenciais do PostgreSQL em `backend/.env`, seguindo o modelo `backend/.env.example`.
2. No terminal, entre em `backend` e execute `npm install` (se necessário) e `npm run dev`.
3. Abra `http://localhost:3000` no navegador.

A API e a interface são servidas pelo mesmo processo. Os endpoints disponíveis são `/alunos`, `/cursos` e `/turmas`.
