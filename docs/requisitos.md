# Requisitos do sistema

## Requisitos funcionais

### RF01 — Cadastro de materiais
O sistema deve permitir cadastrar materiais, estruturas, equipamentos e locais de armazenamento.

### RF02 — Cadastro de atributos técnicos
O sistema deve permitir registrar atributos técnicos e operacionais do item, incluindo fabricação, pintura, projetos, responsáveis, datas e quantidade.

### RF03 — Cadastro de anexos
O sistema deve permitir anexar fotos, certificados e documentos relacionados ao item.

### RF04 — Geração de QR Code
O sistema deve gerar um QR Code único para cada item ou local cadastrado.

### RF05 — Consulta por leitura do QR
O sistema deve abrir uma página de consulta ao escanear o QR Code.

### RF06 — Visualização de informações detalhadas
A página de consulta deve exibir os dados necessários para identificação e validação do material em campo.

### RF07 — Registro de ocorrência
O sistema deve permitir registrar aviso, melhoria ou não conformidade a partir da tela do QR.

### RF08 — Identificação do reportante
O sistema deve registrar nome e empresa de quem abriu a ocorrência.

### RF09 — Notificação no dashboard
Toda ocorrência registrada deve ser encaminhada para o dashboard operacional.

### RF10 — Gestão de status
O sistema deve permitir controlar o status das ocorrências como aberto, em andamento e resolvido.

### RF11 — Filtros operacionais
O dashboard deve permitir filtrar ocorrências por tipo, local, QR e status.

### RF12 — Controle de acesso
O sistema deve permitir acesso com login e perfis diferenciados.

### RF13 — Gestão de QR ativos e encerrados
O sistema deve disponibilizar listagem e consulta dos QR Codes ativos, encerrados e com pendências.

### RF14 — Histórico de tratativas
O sistema deve manter registro das ações realizadas sobre cada ocorrência.

### RF15 — Suporte a múltiplos ambientes
O sistema deve suportar a aplicação da mesma lógica em pátio, malhão, equipamentos e outras áreas definidas.

### RF16 — Área administrativa estruturada
O sistema deve possuir uma área administrativa protegida para operação interna, contemplando dashboard, cadastros, ocorrências, QR Codes, anexos, usuários e auditoria.

### RF17 — Frontend em Solid
O frontend do projeto deve ser estruturado em Solid, com separação entre rotas públicas de consulta e rotas administrativas autenticadas.

## Requisitos não funcionais

### RNF01 — Simplicidade no campo
A jornada de consulta em campo deve ser simples, com foco em poucos passos e mínima fricção de uso.

### RNF02 — Desempenho
A página acessada via QR deve ser leve e carregar rapidamente em dispositivos móveis.

### RNF03 — Responsividade
A interface deve ser adequada para celular, tablet e desktop.

### RNF04 — Operação com internet instável
O sistema deve considerar cenários de conexão limitada, com suporte a estratégias de cache e evolução para modo PWA.

### RNF05 — Rastreabilidade
As ações relevantes devem manter registro de data, hora e usuário responsável.

### RNF06 — Clareza visual
As categorias de ocorrência devem ter distinção visual clara por cor e status.

### RNF07 — Segurança de acesso
O acesso a módulos administrativos deve exigir autenticação e autorização por perfil.

### RNF08 — Escalabilidade operacional
A solução deve suportar expansão para novos ambientes de armazenamento e novos tipos de materiais.

### RNF09 — Manutenibilidade
A arquitetura deve permitir evolução futura sem necessidade de reestruturação completa do sistema.

### RNF10 — Organização do código
A estrutura do frontend deve refletir domínios de negócio e separar claramente módulos públicos e administrativos.
