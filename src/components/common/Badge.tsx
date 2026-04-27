import { JSX } from 'solid-js';
import type { TipoOcorrencia, StatusOcorrencia, StatusQR, StatusMaterial } from '~/lib/types';

const TIPO_LABELS: Record<TipoOcorrencia, string> = {
  nao_conformidade: 'Não Conformidade',
  aviso: 'Aviso',
  melhoria: 'Melhoria',
};

const STATUS_LABELS: Record<StatusOcorrencia, string> = {
  aberto: 'Aberto',
  em_andamento: 'Em Andamento',
  resolvido: 'Resolvido',
};

export function TipoBadge(props: { tipo: TipoOcorrencia }): JSX.Element {
  const cls = () =>
    ({
      nao_conformidade: 'badge badge-nao-conformidade',
      aviso: 'badge badge-aviso',
      melhoria: 'badge badge-melhoria',
    })[props.tipo];

  return <span class={cls()}>{TIPO_LABELS[props.tipo]}</span>;
}

export function StatusBadge(props: { status: StatusOcorrencia }): JSX.Element {
  const cls = () =>
    ({
      aberto: 'badge badge-aberto',
      em_andamento: 'badge badge-em-andamento',
      resolvido: 'badge badge-resolvido',
    })[props.status];

  return <span class={cls()}>{STATUS_LABELS[props.status]}</span>;
}

export function QRStatusBadge(props: { status: StatusQR }): JSX.Element {
  return (
    <span class={props.status === 'ativo' ? 'badge badge-ativo' : 'badge badge-inativo'}>
      {props.status === 'ativo' ? 'Ativo' : 'Inativo'}
    </span>
  );
}

export function MaterialStatusBadge(props: { status: StatusMaterial }): JSX.Element {
  const cls = () =>
    ({
      ativo: 'badge badge-ativo',
      inativo: 'badge badge-inativo',
      montado: 'badge badge-resolvido',
    })[props.status];

  const label = () =>
    ({ ativo: 'Ativo', inativo: 'Inativo', montado: 'Montado' })[props.status];

  return <span class={cls()}>{label()}</span>;
}
