export type TipoLocal = 'patio' | 'malhao' | 'equipamento' | 'estrutura' | 'outro';
export type StatusLocal = 'ativo' | 'inativo';

export type StatusMaterial = 'ativo' | 'inativo' | 'montado';

export type StatusQR = 'ativo' | 'inativo';

export type TipoOcorrencia = 'nao_conformidade' | 'aviso' | 'melhoria';
export type StatusOcorrencia = 'aberto' | 'em_andamento' | 'resolvido';

export type PerfilUsuario = 'admin' | 'operador' | 'fiscal' | 'colaborador';

export interface Local {
  id: string;
  codigo_local: string;
  nome_local: string;
  tipo_local: TipoLocal;
  descricao_local: string;
  area: string;
  referencia_fisica: string;
  status_local: StatusLocal;
  created_at: string;
}

export interface Material {
  id: string;
  codigo_interno: string;
  descricao: string;
  tipo_estrutura: string;
  quantidade_total: number;
  data_fabricacao: string;
  data_pintura: string;
  tipo_pintura: string;
  responsavel_pintura: string;
  projeto_fabricacao: string;
  projeto_montagem: string;
  previsao_montagem: string;
  data_chegada_vale: string;
  responsavel_tecnico: string;
  supervisor_responsavel: string;
  status_operacional: StatusMaterial;
  local_id: string;
  observacoes: string;
  created_at: string;
  updated_at: string;
}

export interface QRCodeItem {
  id: string;
  codigo_qr: string;
  url_consulta: string;
  material_id: string;
  local_id: string;
  status_qr: StatusQR;
  data_geracao: string;
  data_inativacao?: string;
}

export interface HistoricoOcorrencia {
  id: string;
  usuario_nome: string;
  acao: string;
  comentario: string;
  status_anterior: StatusOcorrencia;
  status_novo: StatusOcorrencia;
  data_evento: string;
}

export interface Ocorrencia {
  id: string;
  codigo_ocorrencia: string;
  qr_code_id: string;
  material_id: string;
  local_id: string;
  tipo_ocorrencia: TipoOcorrencia;
  descricao: string;
  nome_reportante: string;
  empresa_reportante: string;
  status: StatusOcorrencia;
  data_abertura: string;
  data_fechamento?: string;
  resolucao_resumida?: string;
  historico: HistoricoOcorrencia[];
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha_hash: string;
  perfil: PerfilUsuario;
  empresa: string;
  status: 'ativo' | 'inativo';
  created_at: string;
}
