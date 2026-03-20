# Modelo de dados conceitual

## Visão geral

O modelo abaixo descreve as entidades principais necessárias para sustentar o SRCM em nível conceitual. Não se trata ainda de um schema técnico definitivo, mas de uma base para modelagem posterior.

## Entidade: Material

Representa a peça, estrutura, conjunto ou equipamento armazenado.

### Campos sugeridos

- id;
- codigo_interno;
- descricao;
- tipo_estrutura;
- quantidade_total;
- data_fabricacao;
- data_pintura;
- tipo_pintura;
- responsavel_pintura;
- projeto_fabricacao;
- projeto_montagem;
- previsao_montagem;
- data_chegada_vale;
- responsavel_tecnico;
- supervisor_responsavel;
- status_operacional;
- observacoes.

## Entidade: Local

Representa onde o material está armazenado ou identificado.

### Campos sugeridos

- id;
- codigo_local;
- nome_local;
- tipo_local;
- descricao_local;
- area;
- referencia_fisica;
- status_local.

### Tipos esperados de local

- pátio;
- malhão;
- equipamento;
- estrutura;
- outro contexto definido pela operação.

## Entidade: QRCode

Representa o identificador digital associado a um material ou local.

### Campos sugeridos

- id;
- codigo_qr;
- url_consulta;
- material_id;
- local_id;
- status_qr;
- data_geracao;
- data_inativacao;
- motivo_inativacao.

## Entidade: Anexo

Representa documentos e evidências visuais vinculados ao item.

### Campos sugeridos

- id;
- material_id;
- tipo_anexo;
- nome_arquivo;
- caminho_arquivo;
- descricao;
- data_upload;
- usuario_upload.

### Tipos esperados de anexo

- foto;
- certificado de pintura;
- certificado de solda;
- projeto de fabricação;
- projeto de montagem;
- documento complementar.

## Entidade: Ocorrencia

Representa um registro aberto a partir da leitura do QR.

### Campos sugeridos

- id;
- codigo_ocorrencia;
- qr_code_id;
- material_id;
- local_id;
- tipo_ocorrencia;
- descricao;
- nome_reportante;
- empresa_reportante;
- status;
- prioridade;
- data_abertura;
- data_fechamento;
- resolucao_resumida.

### Tipos esperados

- não conformidade;
- aviso;
- melhoria.

### Status esperados

- aberto;
- em andamento;
- resolvido.

## Entidade: Usuario

Representa as pessoas com acesso ao sistema.

### Campos sugeridos

- id;
- nome;
- email;
- login;
- senha_hash;
- empresa;
- perfil;
- unidade;
- status;
- data_criacao;
- ultimo_acesso.

## Entidade: HistoricoOcorrencia

Representa o registro das ações realizadas sobre uma ocorrência.

### Campos sugeridos

- id;
- ocorrencia_id;
- usuario_id;
- acao;
- comentario;
- status_anterior;
- status_novo;
- data_evento.

## Relacionamentos principais

- um **Local** pode armazenar vários **Materiais**;
- um **Material** pode possuir vários **Anexos**;
- um **Material** ou **Local** pode estar associado a um **QRCode** ativo;
- um **QRCode** pode originar várias **Ocorrencias** ao longo do tempo;
- uma **Ocorrencia** pode possuir vários registros em **HistoricoOcorrencia**;
- um **Usuario** pode cadastrar materiais, anexar documentos, abrir ocorrências e registrar tratativas conforme seu perfil.
