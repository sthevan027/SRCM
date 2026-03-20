# Administração, perfis e governança

## Visão geral

O SRCM precisa de uma governança clara para funcionar de verdade na obra. O sistema não pode depender de boa vontade difusa; ele precisa ter donos, mantenedores e auditadores.

## Estrutura de responsabilidade

### Cadastro inicial
Responsáveis principais:

- equipe da fábrica/galpão JL;
- almoxarifado;
- segurança.

### Manutenção operacional na obra
Responsáveis principais:

- almoxarifado JL na obra;
- segurança JL na obra;
- equipe JL alocada na Vale.

### Validação de padrão
Responsável de apoio:

- qualidade.

### Auditoria e cobrança
Responsáveis de fiscalização do processo:

- engenharia de segurança;
- fiscalização;
- supervisão, quando aplicável.

## Princípio de governança

- qualquer usuário autorizado pode consultar;
- qualquer usuário autorizado pode reportar;
- apenas perfis responsáveis podem cadastrar e manter registros estruturais;
- a tratativa das ocorrências fica concentrada na equipe JL alocada na Vale;
- qualidade, segurança e fiscalização apoiam controle e cobrança.

## Perfis sugeridos

### 1. Colaborador de campo
Pode:

- escanear QR;
- visualizar informações;
- registrar aviso, melhoria ou não conformidade.

Não pode:

- cadastrar material;
- editar dados estruturais;
- encerrar ocorrência.

### 2. Fiscalização
Pode:

- consultar materiais;
- abrir ocorrências;
- acompanhar tratativas.

Não precisa necessariamente:

- editar a base estrutural do sistema.

### 3. Fábrica/Galpão JL
Pode:

- cadastrar materiais de origem;
- anexar certificados;
- registrar dados de fabricação;
- atualizar dados antes do envio à obra.

### 4. Almoxarifado
Pode:

- manter dados relacionados à chegada, armazenamento e organização;
- atualizar quantidades e contexto do local;
- apoiar controle dos QR Codes.

### 5. Segurança
Pode:

- apoiar a manutenção do sistema;
- participar da governança e organização;
- atuar na cobrança de conformidade operacional.

### 6. Qualidade
Pode:

- validar consistência de dados e evidências;
- apoiar análise de desvios;
- sustentar padronização documental.

### 7. Equipe JL alocada na Vale
Pode:

- visualizar o dashboard completo;
- analisar ocorrências;
- registrar tratativas;
- atualizar status;
- encerrar ocorrências.

### 8. Administrador do sistema
Pode:

- gerenciar usuários;
- definir permissões;
- parametrizar regras gerais;
- manter visão global da solução.

## Módulos previstos da área administrativa

A área administrativa será a principal interface protegida do sistema em Solid. Ela deve concentrar os fluxos mais completos e menos sensíveis à quantidade de cliques.

### Módulos principais do admin

- dashboard geral;
- cadastro de materiais;
- cadastro de locais;
- gestão de QR Codes;
- ocorrências e tratativas;
- anexos e documentos;
- usuários e permissões;
- auditoria/histórico;
- configurações gerais.

## Árvore prevista para o admin

Abaixo está uma previsão inicial de organização da área administrativa no frontend em Solid:

```text
src/routes/(admin)/
├── admin.tsx
├── dashboard/
│   ├── index.tsx
│   └── components/
├── materiais/
│   ├── index.tsx
│   ├── novo.tsx
│   ├── [id].tsx
│   └── components/
├── locais/
│   ├── index.tsx
│   ├── novo.tsx
│   ├── [id].tsx
│   └── components/
├── qrcodes/
│   ├── index.tsx
│   ├── novo.tsx
│   ├── [id].tsx
│   └── components/
├── ocorrencias/
│   ├── index.tsx
│   ├── [id].tsx
│   └── components/
├── anexos/
│   ├── index.tsx
│   └── components/
├── usuarios/
│   ├── index.tsx
│   ├── novo.tsx
│   ├── [id].tsx
│   └── components/
├── auditoria/
│   ├── index.tsx
│   └── components/
└── configuracoes/
    ├── index.tsx
    └── components/
```

Essa árvore é uma referência inicial e pode ser refinada durante a implementação, mas já serve para orientar a configuração do ambiente e a separação de responsabilidades dentro do código.

## Diretriz administrativa

Se a responsabilidade não estiver explícita, o sistema tende a perder uso e atualização. Por isso, a documentação do projeto assume desde o início que o SRCM deve ter dono operacional, dono de cadastro e responsáveis por auditoria.
