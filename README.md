# ObraTrack

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

![SolidJS](https://img.shields.io/badge/SolidJS-1.9-2C4F7C?logo=solid&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white) ![Vitest](https://img.shields.io/badge/Vitest-2-6E9F18?logo=vitest&logoColor=white) ![pnpm](https://img.shields.io/badge/pnpm-9-F69220?logo=pnpm&logoColor=white)

## 🚀 Evolução: de controle interno para SaaS de rastreabilidade

**De → Para:** de sistema interno de 5S para produto multiempresa de rastreabilidade de materiais em obra.

**Novas funcionalidades:** app de campo offline-first (registra sem internet e sincroniza depois); dashboard de consumo × orçado por obra e centro de custo com alertas de divergência; multiusuário e multiobra com papéis (fiscalização, almoxarife, gestor).

**Mudanças na lógica:** o QR passa a apontar para lote/movimentação, não só local; estado local-first com fila de sincronização e resolução de conflito; dados isolados por obra (multitenant).

Sistema de Rastreabilidade e Controle de Materiais.

O SRCM é um projeto de sistema interno voltado para obras industriais, com foco em organização operacional, rastreabilidade de materiais e apoio ao avanço da maturidade 5S. A proposta surgiu a partir de uma necessidade prática observada em campo: a dificuldade de manter pátios, malhões, equipamentos e áreas de armazenamento organizados, padronizados e auditáveis ao longo do ciclo da obra.

O conceito central do sistema é simples: cada local de armazenamento ou conjunto de materiais recebe um QR Code único. Ao escanear esse código, qualquer colaborador autorizado, integrante da fiscalização ou equipe operacional pode acessar rapidamente uma página leve com os dados do material, seus anexos e seu contexto operacional. A mesma interface também permite registrar avisos, melhorias e não conformidades, gerando tratativas dentro de um dashboard central.

![Fluxograma SRCM](Imagens/Fluxograma%20SCRM.jpeg)

## Objetivo principal

Garantir organização, rastreabilidade e controle dos materiais em ambiente de obra, apoiando a evolução da maturidade 5S por meio de um processo digital simples, rápido e auditável.

## Problema que o SRCM resolve

Em obras industriais, a organização física dos materiais costuma sofrer com problemas recorrentes:

- dificuldade para localizar materiais e estruturas nos pátios;
- armazenamento sem padrão visual consistente;
- baixa rastreabilidade entre fabricação, chegada à obra e montagem;
- perda de tempo operacional procurando peças ou confirmando informações;
- risco de divergência entre o que está armazenado e o que o campo acredita existir;
- dificuldade para sustentar níveis mais altos de maturidade 5S por longos períodos.

O SRCM foi concebido para atuar exatamente nesse ponto, criando um modelo de organização operacional digital aplicável à realidade da obra.

## Como o sistema funciona

1. A equipe responsável cadastra o material ou local no sistema.
2. O cadastro recebe informações técnicas, operacionais e documentais.
3. O sistema gera um QR Code único para aquele item ou local.
4. O QR Code é fixado no pátio, malhão, equipamento ou área de armazenamento.
5. Ao escanear o código, o usuário acessa uma página leve com o detalhamento completo.
6. Caso exista alguma divergência, o usuário pode registrar uma ocorrência.
7. A ocorrência entra no dashboard e passa a ser tratada pela equipe JL alocada na Vale.

## Stack prevista para implementação

A documentação agora passa a assumir a futura construção do projeto com frontend em **Solid**. A direção proposta para a primeira versão é:

- **frontend**: SolidStart/SolidJS para interface web e futura evolução para PWA;
- **backend**: API dedicada para autenticação, cadastro, QR Codes, anexos e ocorrências;
- **banco de dados**: banco relacional para manter rastreabilidade, histórico e vínculos entre materiais, locais, usuários e tratativas;
- **armazenamento de arquivos**: camada para fotos, certificados e documentos técnicos.

Essa definição ainda é conceitual, mas já orienta a organização da documentação, a árvore prevista do projeto e as decisões de arquitetura.

## Ambientes de aplicação

O projeto foi pensado para escalar dentro da operação, não ficando restrito a um único cenário. O SRCM poderá ser aplicado em:

- pátios de armazenamento;
- malhões;
- equipamentos;
- estruturas metálicas;
- áreas organizadas por código ou posição;
- futuros contextos de armazenamento e controle operacional.

## Tipos de usuários

O sistema deve atender perfis distintos, com níveis de acesso diferentes:

- equipe da fábrica/galpão da JL;
- almoxarifado da obra;
- segurança;
- qualidade;
- engenharia e supervisão;
- fiscalização;
- colaboradores em campo;
- equipe JL alocada na Vale para tratativa das ocorrências.

## Informações previstas em cada QR Code

Ao escanear o QR Code de um local ou material, a página deve permitir visualizar, conforme aplicável:

- código único do QR;
- descrição do material ou estrutura;
- tipo de estrutura;
- total de peças armazenadas naquele local;
- número/código do local;
- projeto de fabricação;
- projeto de montagem;
- data de fabricação;
- data de pintura;
- tipo de pintura/tinta utilizada;
- responsável pela pintura;
- data de chegada à Vale;
- previsão de montagem;
- responsáveis pelo item, como engenheiro ou supervisor;
- foto do material;
- anexos técnicos;
- certificados de pintura;
- certificados de solda;
- outros documentos relevantes.

## Registro de ocorrências

Ao final da página de visualização, o usuário deve encontrar um botão para atualizar ou reportar algo sobre o item. O formulário associado deve ser simples e rápido, voltado para uso real em campo.

Categorias iniciais:

- **Não conformidade**;
- **Aviso**;
- **Melhoria**.

Campos mínimos esperados:

- tipo da ocorrência;
- descrição do ocorrido;
- nome de quem reporta;
- empresa de quem reporta.

## Diretrizes operacionais do projeto

Algumas premissas foram definidas desde a concepção:

- o uso em campo precisa ser simples e objetivo;
- a leitura do QR e a consulta das informações devem ocorrer com o mínimo de fricção;
- o cadastro e a gestão podem ter mais etapas, pois serão operados por perfis responsáveis;
- qualquer pessoa autorizada pode reportar ocorrências;
- a tratativa e resolução ficam com a equipe JL alocada na Vale;
- qualidade, segurança e fiscalização devem ter papel de validação, auditoria e cobrança;
- o sistema deve considerar internet instável e prever estratégia de operação leve com suporte offline parcial/PWA.

## Estrutura da documentação

A documentação detalhada do projeto está organizada em arquivos complementares dentro da pasta `docs/`:

- `docs/problema.md`;
- `docs/objetivo.md`;
- `docs/escopo.md`;
- `docs/funcionalidades.md`;
- `docs/requisitos.md`;
- `docs/arquitetura.md`;
- `docs/modelo-de-dados.md`;
- `docs/fluxos.md`;
- `docs/admin.md`;
- `docs/dashboard.md`;
- `docs/beneficios.md`;
- `docs/roadmap.md`;
- `docs/riscos.md`;
- `docs/estrutura.md`;
- `docs/testes.md`;.

## Status atual

O projeto passou pela **Fase 0 — Base técnica** (conforme `docs/roadmap.md`):

- ✅ Configuração do projeto frontend em Solid (Vite + SolidJS + Solid Router)
- ✅ Estrutura de pastas e rotas básicas
- ✅ Base de testes com Vitest e @solidjs/testing-library
- ✅ Pipeline CI no GitHub (lint, typecheck, testes, build)
- ✅ ESLint, Prettier e workflows de segurança

### Pré-requisitos

- **Node.js 18+** (recomendado: Node 20 LTS)
- **pnpm** como gerenciador de pacotes

### Setup do ambiente

**1. Instalar/atualizar Node.js (se necessário)**

Se você usa **nvm** (Node Version Manager):

```bash
nvm install 20
nvm use
```

Se você usa **fnm** (Fast Node Manager):

```bash
fnm install 20
fnm use
```

Sem gerenciador de versões? Instale o **nvm** (`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash`) ou **fnm** (`curl -fsSL https://fnm.vercel.app/install | bash`).

O projeto inclui um arquivo `.nvmrc` com a versão recomendada. No diretório do projeto, execute `nvm use` ou `fnm use` para selecionar a versão correta automaticamente.

**2. Habilitar pnpm via Corepack**

O Node.js inclui o Corepack para gerenciar pnpm. Após ter Node 18+:

```bash
corepack enable
```

Se necessário, execute com `sudo`. O `package.json` já define a versão do pnpm via `packageManager`.

**3. Instalar dependências e executar**

```bash
pnpm install          # Instalar dependências
pnpm run dev          # Desenvolvimento
pnpm run build        # Build de produção
pnpm run test         # Rodar testes
pnpm run lint         # Verificar lint
pnpm run typecheck    # Verificar tipos TypeScript
```

### Sobre vulnerabilidades (npm audit)

O `npm audit` pode reportar vulnerabilidades moderadas no esbuild (via Vite/Vitest). A [GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99) afeta o servidor de desenvolvimento do esbuild — o Vite usa seu próprio dev server, portanto o impacto prático é reduzido. A correção definitiva virá com a migração futura para Vite 6+.

### Estrutura de testes

Conforme `docs/testes.md`:

```
tests/
├── unit/
│   ├── infra/        # Testes de infraestrutura
│   ├── app/          # Testes de componentes
│   ├── auth/
│   ├── materiais/
│   ├── qrcodes/
│   └── ocorrencias/
├── integration/
└── e2e/
```

**Nota**: O frontend está configurado como SPA (Vite + Solid) na base. A migração para SolidStart pode ser feita posteriormente, conforme evolução do framework.
