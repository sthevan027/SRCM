# Estrutura prevista do projeto

## Objetivo do documento

Este documento apresenta uma previsão inicial da árvore de arquivos do SRCM considerando a futura implementação do frontend em Solid e a separação entre experiência pública de consulta via QR e área administrativa autenticada.

A estrutura abaixo não é definitiva, mas serve como guia para a configuração inicial do ambiente, definição de responsabilidades e organização do código.

## Visão geral da árvore

```text
SRCM/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml
│   │   └── feature_request.yml
│   └── workflows/
│       ├── ci.yml
│       ├── lint.yml
│       ├── security.yml
│       └── issue-triage.yml
├── public/
│   ├── icons/
│   └── images/
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   └── illustrations/
│   ├── components/
│   │   ├── common/
│   │   ├── forms/
│   │   ├── layout/
│   │   ├── status/
│   │   └── qr/
│   ├── features/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── materiais/
│   │   ├── locais/
│   │   ├── qrcodes/
│   │   ├── ocorrencias/
│   │   ├── anexos/
│   │   └── usuarios/
│   ├── lib/
│   │   ├── api/
│   │   ├── constants/
│   │   ├── helpers/
│   │   ├── validations/
│   │   └── storage/
│   ├── routes/
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   ├── qr/
│   │   │   └── [codigo].tsx
│   │   └── (admin)/
│   │       ├── admin.tsx
│   │       ├── dashboard/
│   │       │   └── index.tsx
│   │       ├── materiais/
│   │       │   ├── index.tsx
│   │       │   ├── novo.tsx
│   │       │   └── [id].tsx
│   │       ├── locais/
│   │       │   ├── index.tsx
│   │       │   ├── novo.tsx
│   │       │   └── [id].tsx
│   │       ├── qrcodes/
│   │       │   ├── index.tsx
│   │       │   ├── novo.tsx
│   │       │   └── [id].tsx
│   │       ├── ocorrencias/
│   │       │   ├── index.tsx
│   │       │   └── [id].tsx
│   │       ├── anexos/
│   │       │   └── index.tsx
│   │       ├── usuarios/
│   │       │   ├── index.tsx
│   │       │   ├── novo.tsx
│   │       │   └── [id].tsx
│   │       ├── auditoria/
│   │       │   └── index.tsx
│   │       └── configuracoes/
│   │           └── index.tsx
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── materiais.service.ts
│   │   ├── locais.service.ts
│   │   ├── qrcodes.service.ts
│   │   ├── ocorrencias.service.ts
│   │   └── usuarios.service.ts
│   ├── stores/
│   │   ├── auth.store.ts
│   │   ├── filtros.store.ts
│   │   └── ui.store.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── tokens.css
│   ├── app.tsx
│   └── entry-client.tsx
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
├── LICENSE
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Separação por áreas

### Área pública

A área pública é voltada para leitura do QR Code e consulta rápida em campo. Ela deve ter poucas telas e ser extremamente leve.

Exemplos:

- rota inicial;
- tela de login, quando necessária;
- rota pública `/qr/[codigo]` para leitura e visualização do item.

### Área administrativa

A área administrativa é protegida por autenticação e concentra os fluxos mais completos do sistema:

- dashboard;
- cadastro de materiais;
- cadastro de locais;
- gestão de QR Codes;
- ocorrências;
- anexos;
- usuários;
- auditoria;
- configurações.

## Organização por domínio

A previsão é separar boa parte da lógica por domínio de negócio, evitando uma estrutura solta e difícil de manter.

### Domínios iniciais sugeridos

- auth;
- dashboard;
- materiais;
- locais;
- qrcodes;
- ocorrencias;
- anexos;
- usuarios.

## Critérios para a árvore proposta

A árvore foi pensada para atender os seguintes critérios:

- clareza para iniciar o projeto;
- separação entre uso em campo e administração;
- facilidade para crescimento sem bagunçar o código;
- reaproveitamento de componentes;
- coerência com a futura stack em Solid;
- espaço claro para testes e automações do GitHub.

## Observação final

Durante a implementação, a árvore pode ser ajustada conforme a configuração escolhida para o SolidStart, o backend e o padrão de módulos. Mesmo assim, esta estrutura já serve como base prática para começar a montar o ambiente do projeto.
