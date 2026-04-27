import { createSignal } from 'solid-js';
import { storage, KEYS } from '~/lib/storage';
import type { Ocorrencia, StatusOcorrencia, TipoOcorrencia } from '~/lib/types';

const [ocorrencias, setOcorrencias] = createSignal<Ocorrencia[]>(
  storage.get<Ocorrencia>(KEYS.OCORRENCIAS),
);

export { ocorrencias };

export function refreshOcorrencias(): void {
  setOcorrencias(storage.get<Ocorrencia>(KEYS.OCORRENCIAS));
}

export interface NovaOcorrencia {
  qr_code_id: string;
  material_id: string;
  local_id: string;
  tipo_ocorrencia: TipoOcorrencia;
  descricao: string;
  nome_reportante: string;
  empresa_reportante: string;
}

export function addOcorrencia(data: NovaOcorrencia): Ocorrencia {
  const total = storage.get<Ocorrencia>(KEYS.OCORRENCIAS).length + 1;
  const ocorrencia: Ocorrencia = {
    id: `oc-${Date.now()}`,
    codigo_ocorrencia: `OC-${String(total).padStart(4, '0')}`,
    ...data,
    status: 'aberto',
    data_abertura: new Date().toISOString(),
    historico: [],
  };
  storage.add(KEYS.OCORRENCIAS, ocorrencia);
  refreshOcorrencias();
  return ocorrencia;
}

export function updateStatus(
  id: string,
  novoStatus: StatusOcorrencia,
  comentario: string,
  usuarioNome: string,
): void {
  const ocorrencia = storage.getOne<Ocorrencia>(KEYS.OCORRENCIAS, id);
  if (!ocorrencia) return;

  const historico = [
    ...ocorrencia.historico,
    {
      id: `h-${Date.now()}`,
      usuario_nome: usuarioNome,
      acao: `Status alterado para "${novoStatus}"`,
      comentario,
      status_anterior: ocorrencia.status,
      status_novo: novoStatus,
      data_evento: new Date().toISOString(),
    },
  ];

  const updates: Partial<Ocorrencia> = { status: novoStatus, historico };
  if (novoStatus === 'resolvido') updates.data_fechamento = new Date().toISOString();

  storage.update<Ocorrencia>(KEYS.OCORRENCIAS, id, updates);
  refreshOcorrencias();
}

export function getOcorrenciasByQR(qrCodeId: string): Ocorrencia[] {
  return ocorrencias().filter((o) => o.qr_code_id === qrCodeId);
}
