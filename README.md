# SRCM

Sistema de Rastreabilidade e Controle de Materiais.

O SRCM é um projeto de sistema interno voltado para obras industriais, com foco em organização operacional, rastreabilidade de materiais e apoio ao avanço da maturidade 5S. A proposta surgiu a partir de uma necessidade prática observada em campo: a dificuldade de manter pátios, malhões, equipamentos e áreas de armazenamento organizados, padronizados e auditáveis ao longo do ciclo da obra.

O conceito central do sistema é simples: cada local de armazenamento ou conjunto de materiais recebe um QR Code único. Ao escanear esse código, qualquer colaborador autorizado, integrante da fiscalização ou equipe operacional pode acessar rapidamente uma página leve com os dados do material, seus anexos e seu contexto operacional. A mesma interface também permite registrar avisos, melhorias e não conformidades, gerando tratativas dentro de um dashboard central.

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

Este repositório contém a documentação de descoberta, estruturação e planejamento do SRCM. Nesta etapa, o foco está em consolidar escopo, arquitetura, fluxos, responsabilidades, estrutura de pastas, estratégia de testes e visão de produto antes do início da configuração do ambiente e da implementação do sistema.
