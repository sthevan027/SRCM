# Funcionalidades

## 1. Cadastro de materiais e locais

Módulo utilizado pelos perfis responsáveis por estruturar a base do sistema.

### Funções previstas

- cadastrar novo material;
- cadastrar novo local de armazenamento;
- vincular item a pátio, malhão ou equipamento;
- preencher dados técnicos;
- preencher dados operacionais;
- definir responsáveis;
- anexar fotos;
- anexar certificados;
- anexar projetos e documentos complementares.

### Informações esperadas no cadastro

- código do item;
- código do QR;
- descrição do material;
- tipo de estrutura;
- quantidade de peças no local;
- data de fabricação;
- data de pintura;
- tinta/pintura utilizada;
- responsável pela pintura;
- projeto de fabricação;
- projeto de montagem;
- previsão de montagem;
- data de chegada à Vale;
- responsável técnico;
- supervisor responsável;
- fotos;
- certificados de pintura;
- certificados de solda;
- anexos diversos.

## 2. Geração e gestão de QR Codes

### Funções previstas

- gerar QR Code único após cadastro;
- permitir reimpressão do QR;
- listar QRs ativos;
- listar QRs fechados ou inativos;
- associar QR ao local e ao material correspondente;
- consultar histórico do QR.

## 3. Visualização em campo

Ao escanear um QR Code, o usuário deve acessar uma página leve e responsiva, pensada para celular.

### Conteúdo da página

- identificação do QR;
- dados resumidos do local e do item;
- detalhamento técnico;
- responsáveis;
- quantidade disponível/informada;
- fotos e anexos;
- certificados e documentos relevantes;
- status atual do item;
- indicação de existência de ocorrências abertas.

### Características esperadas

- carregamento rápido;
- leitura simples;
- uso intuitivo;
- adequação ao ambiente de obra.

## 4. Registro de ocorrência

Na parte final da página de visualização, deve existir um botão do tipo **Reportar / Atualizar**.

### Categorias

- **Não conformidade**: divergência crítica, item fora do padrão, falta relevante, informação inconsistente;
- **Aviso**: situação que merece atenção, mas não é uma não conformidade formal;
- **Melhoria**: sugestão ou oportunidade para melhorar a organização, identificação ou processo.

### Campos do formulário

- tipo da ocorrência;
- descrição;
- nome do solicitante;
- empresa do solicitante;
- data/hora do envio;
- QR relacionado;
- local relacionado.

## 5. Dashboard operacional

### Recursos esperados

- visão geral das ocorrências;
- cartões ou indicadores por tipo;
- filtros por ambiente;
- filtros por QR Code;
- filtros por status;
- visualização do responsável;
- histórico de tratativa;
- evidência visual por cor.

## 6. Gestão de tratativas

### Funções previstas

- receber nova ocorrência no painel;
- classificar e priorizar;
- atribuir responsável interno;
- atualizar andamento;
- registrar resolução;
- encerrar ocorrência.

### Status mínimos

- aberto;
- em andamento;
- resolvido.

## 7. Controle de usuários e acessos

### Funções previstas

- autenticação por login;
- definição de perfis;
- permissões por módulo;
- segregação entre consulta, cadastro e resolução;
- rastreabilidade das ações realizadas por usuário.

## 8. Estratégia de uso offline/parcialmente offline

Como o ambiente de obra pode apresentar instabilidade de internet, o produto deve prever:

- página leve para leitura do QR;
- cache básico de dados recentes;
- possibilidade de evolução para PWA;
- sincronização posterior quando houver conexão.

## 9. Filtros por contexto operacional

O sistema deve separar a visualização e os registros por filtros que facilitem a operação, incluindo:

- pátio;
- malhão;
- equipamento;
- código do QR;
- tipo de ocorrência;
- status da tratativa.
