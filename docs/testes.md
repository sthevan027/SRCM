# Estratégia de testes do SRCM

## Objetivo do documento

Este documento define a estratégia de testes do SRCM para que o projeto seja construído com segurança, previsibilidade e facilidade de publicação no GitHub.

A intenção é simples: **testar primeiro a base e o comportamento esperado** para que a implementação avance com menos medo de quebrar funcionalidades, menos retrabalho e mais confiança no momento de subir alterações.

## Por que fazer os testes primeiro e depois o código

A lógica por trás dessa decisão é prática:

- os testes ajudam a deixar claro o comportamento esperado antes da implementação;
- a equipe constrói com mais confiança, porque existe validação automática;
- regressões são percebidas cedo;
- o GitHub recebe alterações já validadas;
- o projeto ganha base para crescer sem virar uma sequência de correções manuais;
- a documentação funcional se transforma em critérios verificáveis.

Em outras palavras: primeiro definimos **o que precisa funcionar**, depois escrevemos o código para cumprir isso.

## Princípios da estratégia de testes

- toda funcionalidade relevante deve nascer com validação automatizada;
- testes devem rodar localmente e no GitHub;
- segurança e vulnerabilidade devem ser verificadas desde cedo;
- CI deve bloquear mudanças que quebrem build, lint ou testes essenciais;
- a estrutura do projeto deve facilitar manutenção dos testes;
- bugs recorrentes devem gerar aprendizado e virar novos testes.

## Camadas de teste previstas

### 1. Testes de infraestrutura

Testes e validações automáticas para garantir que a base do projeto está saudável.

#### Objetivos

- validar instalação do ambiente;
- garantir que o projeto sobe sem erro;
- validar build;
- validar configuração essencial;
- detectar quebra de dependências cedo.

#### Exemplos

- instalação de dependências sem falha;
- validação do build da aplicação;
- checagem de variáveis de ambiente obrigatórias;
- validação de rotas básicas;
- validação da integração inicial com serviços e API.

### 2. Testes internos do projeto

Testes focados no comportamento das funcionalidades principais do SRCM.

#### Fluxos prioritários

##### Login

Validar:

- login com credenciais válidas;
- bloqueio com credenciais inválidas;
- proteção das rotas administrativas;
- persistência de sessão quando aplicável.

##### Geração de QR Code e código do item

Validar:

- criação de QR Code único;
- associação correta entre QR, item e local;
- não duplicação indevida de código;
- abertura correta da rota de visualização do QR.

##### Cadastro de material

Validar:

- criação de material com campos obrigatórios;
- rejeição de cadastro incompleto;
- vínculo com local correto;
- persistência de dados técnicos e anexos;
- atualização posterior do cadastro.

##### Reporte de ocorrência

Validar:

- abertura de aviso;
- abertura de melhoria;
- abertura de não conformidade;
- exigência de nome e empresa;
- vínculo correto com QR, item e local.

##### Geração e visualização de informações

Validar:

- carregamento da página do item;
- exibição das informações essenciais;
- exibição de anexos e fotos;
- consistência entre dado cadastrado e dado exibido;
- sinalização visual do tipo de ocorrência quando houver pendência.

### 3. Testes de integração

Garantem que os módulos se conversem corretamente.

#### Exemplos

- login + acesso ao admin;
- cadastro de material + geração do QR;
- leitura do QR + abertura da tela pública;
- reporte de ocorrência + entrada no dashboard;
- alteração de status + atualização do histórico.

### 4. Testes end-to-end

Simulam o uso real do sistema do início ao fim.

#### Cenários prioritários

- usuário administrativo cria material, gera QR e publica o item;
- colaborador lê o QR e consulta dados;
- colaborador abre uma ocorrência;
- equipe JL alocada na Vale trata a ocorrência e fecha o fluxo;
- sistema mantém consistência entre tela pública, admin e dashboard.

### 5. Testes de segurança

A segurança precisa entrar desde a base do projeto, não apenas no final.

#### Itens a validar

- proteção de rotas administrativas;
- controle por perfil de acesso;
- exposição indevida de dados;
- validação de autenticação e autorização;
- tratamento de upload de anexos;
- prevenção contra dependências vulneráveis;
- verificação de segredos e credenciais expostas.

### 6. Testes de vulnerabilidade

Além dos testes funcionais, o projeto deve ter verificações automáticas de vulnerabilidade.

#### Verificações previstas

- auditoria de dependências;
- scan de pacotes com vulnerabilidades conhecidas;
- secret scanning;
- análise estática de segurança quando possível;
- revisão periódica de bibliotecas críticas.

## Estratégia de CI no GitHub

O GitHub deve ser tratado como ambiente oficial de validação antes do merge.

### Pipeline mínima esperada

1. instalar dependências;
2. rodar lint;
3. rodar validações de estilo;
4. rodar testes unitários;
5. rodar testes de integração;
6. validar build;
7. rodar auditoria de segurança/vulnerabilidade;
8. publicar status da pipeline no pull request.

### Objetivo da CI

- impedir merge de mudanças quebradas;
- dar confiança para subir código;
- padronizar a qualidade mínima do projeto;
- reduzir problemas depois do push.

## GitHub e automações relacionadas a bugs/issues

Além da CI, o projeto pode usar automações simples para organizar erros e manutenção.

### Estrutura recomendada

- template de bug report;
- template de feature request;
- labels automáticas para bugs, segurança, documentação e testes;
- automação para triagem inicial de issues;
- vínculo entre bug corrigido e teste criado.

### Regra recomendada

Sempre que um bug real for encontrado e corrigido, ele deve gerar ou atualizar pelo menos um teste para evitar recorrência.

## Estrutura recomendada para testes no repositório

```text
.github/
├── ISSUE_TEMPLATE/
│   ├── bug_report.yml
│   └── feature_request.yml
└── workflows/
    ├── ci.yml
    ├── security.yml
    ├── lint.yml
    └── issue-triage.yml

tests/
├── unit/
│   ├── auth/
│   ├── materiais/
│   ├── qrcodes/
│   └── ocorrencias/
├── integration/
│   ├── auth/
│   ├── materiais/
│   ├── dashboard/
│   └── ocorrencias/
└── e2e/
    ├── login/
    ├── leitura-qr/
    ├── cadastro-material/
    └── reporte/
```

## Ordem sugerida de implementação dos testes

### Etapa 1 — Base técnica

- configurar lint e formatadores;
- configurar pipeline no GitHub;
- configurar estrutura de testes unitários, integração e e2e;
- validar build inicial.

### Etapa 2 — Fluxos críticos

- login;
- cadastro de material;
- geração de QR;
- leitura do QR;
- reporte de ocorrência.

### Etapa 3 — Segurança e robustez

- auditoria de vulnerabilidades;
- testes de permissão;
- testes de upload/anexos;
- validações adicionais de regressão.

## Critério de pronto recomendado

Uma entrega só deve ser considerada pronta quando:

- os testes previstos para aquela funcionalidade existirem;
- a CI estiver verde;
- o build estiver válido;
- não houver alerta crítico de segurança conhecido;
- a funcionalidade principal tiver cobertura dos fluxos essenciais.

## Conclusão

A estratégia de testes do SRCM existe para permitir evolução com confiança. Ela reduz medo de implementar, diminui risco de quebra e cria uma base sólida para publicar mudanças no GitHub com mais segurança.
