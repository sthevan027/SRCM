# Arquitetura proposta

## Visão geral

O SRCM foi pensado como um sistema web com potencial de evolução para PWA, equilibrando simplicidade de uso em campo com um backoffice mais completo para cadastro, gestão e tratativa.

## Direção tecnológica atual

Para orientar o início do projeto, a stack prevista passa a considerar:

- **frontend principal**: SolidStart/SolidJS;
- **camada de UI**: componentes reutilizáveis para páginas públicas, formulários e área administrativa;
- **backend/API**: serviço dedicado para autenticação, materiais, locais, QR Codes, anexos e ocorrências;
- **persistência**: banco relacional para garantir rastreabilidade e histórico;
- **arquivos**: armazenamento para fotos, certificados e projetos.

A escolha de Solid é coerente com a necessidade de uma interface rápida, responsiva e leve, especialmente para o uso em campo por celular.

## Camadas principais

### 1. Frontend web

Responsável por duas experiências distintas:

- **consulta em campo**: página leve acessada por leitura do QR Code;
- **backoffice**: área autenticada para cadastro, gestão, filtros e resolução.

#### Diretrizes para o frontend

- design responsivo;
- foco em navegação simples;
- leitura rápida em ambiente de obra;
- possibilidade de evolução para instalação como PWA;
- estratégia de cache para páginas e dados essenciais;
- separação clara entre rotas públicas e rotas administrativas.

### 2. Backend / API

Responsável por centralizar regras, persistir dados e expor os recursos do sistema.

#### Responsabilidades esperadas

- autenticação e autorização;
- gestão de materiais;
- gestão de locais;
- geração e vinculação de QR Codes;
- recebimento de ocorrências;
- controle de anexos e documentos;
- consulta de dashboard;
- histórico de atualizações.

### 3. Banco de dados

Armazena as entidades centrais do sistema e seus relacionamentos.

#### Informações principais a persistir

- materiais;
- locais;
- QR Codes;
- usuários;
- anexos;
- ocorrências;
- histórico de tratativas;
- status operacionais.

## Modelo de navegação esperado

### Jornada 1 — Consulta em campo

1. usuário escaneia o QR Code;
2. navegador abre uma rota pública controlada ou semipública;
3. frontend em Solid consulta a API;
4. API retorna os dados estruturados do item;
5. usuário visualiza informações e, se necessário, registra uma ocorrência.

### Jornada 2 — Cadastro e gestão

1. usuário autenticado acessa o backoffice;
2. preenche cadastro ou edita item existente;
3. sistema valida dados;
4. backend persiste informações;
5. sistema gera ou atualiza QR Code;
6. item passa a compor dashboard e consultas.

## Estratégia offline / conectividade limitada

A conectividade em obra é um fator crítico. Por isso, a arquitetura deve prever uma abordagem híbrida.

### Etapa inicial

- sistema web leve;
- páginas com otimização de carregamento;
- cache de conteúdo recente;
- comportamento resiliente para baixa conectividade.

### Evolução desejada

- PWA com armazenamento local;
- sincronização posterior de alterações;
- disponibilidade de consulta de informações básicas mesmo sem internet.

## Componentes lógicos sugeridos

- módulo de autenticação;
- módulo de cadastro de materiais;
- módulo de locais e armazenamento;
- módulo de anexos e documentos;
- módulo de QR Code;
- módulo de ocorrências;
- módulo de dashboard;
- módulo de auditoria e histórico.

## Organização esperada do frontend Solid

A camada em Solid deve ser separada por domínios de negócio, preservando clareza para o desenvolvimento:

- rotas públicas para leitura de QR;
- rotas administrativas protegidas;
- componentes compartilhados de layout, formulário e status;
- stores/serviços para autenticação, materiais, locais, QR Codes e ocorrências;
- utilitários para formatação, validação e integração com a API.

A árvore prevista do projeto está detalhada em `docs/estrutura.md`.

## Considerações de segurança

- controle por perfil de acesso;
- rastreio de autor de cada alteração relevante;
- segregação entre quem reporta e quem resolve;
- proteção dos módulos administrativos;
- preservação de histórico para auditoria.

## Diretriz de arquitetura de produto

O SRCM não deve ser tratado como um ERP completo. Sua arquitetura deve priorizar um problema bem definido: organização e rastreabilidade de materiais em campo com gestão simples de desvios. Isso mantém o produto objetivo, adotável e mais viável de implantar.
