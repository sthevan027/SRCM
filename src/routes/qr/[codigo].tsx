import { JSX, createSignal, Show, For, Index } from 'solid-js';
import { useParams } from '@solidjs/router';
import { getQRByCodigo } from '~/stores/qrcodes.store';
import { getMaterialById } from '~/stores/materiais.store';
import { getLocalById } from '~/stores/locais.store';
import { addOcorrencia, getOcorrenciasByQR } from '~/stores/ocorrencias.store';
import { TipoBadge, StatusBadge } from '~/components/common/Badge';
import type { TipoOcorrencia } from '~/lib/types';

const TIPO_LOCAL_LABEL: Record<string, string> = {
  patio: 'Pátio',
  malhao: 'Malhão',
  equipamento: 'Equipamento',
  estrutura: 'Estrutura',
  outro: 'Outro',
};

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('pt-BR');
}

export default function QRDetalhes(): JSX.Element {
  const params = useParams<{ codigo: string }>();
  const qr = () => getQRByCodigo(params.codigo);
  const material = () => {
    const q = qr();
    return q ? getMaterialById(q.material_id) : undefined;
  };
  const local = () => {
    const q = qr();
    return q ? getLocalById(q.local_id) : undefined;
  };
  const ocorrencias = () => {
    const q = qr();
    return q ? getOcorrenciasByQR(q.id) : [];
  };

  const [showForm, setShowForm] = createSignal(false);
  const [tipo, setTipo] = createSignal<TipoOcorrencia | ''>('');
  const [descricao, setDescricao] = createSignal('');
  const [nome, setNome] = createSignal('');
  const [empresa, setEmpresa] = createSignal('');
  const [enviado, setEnviado] = createSignal(false);
  const [erro, setErro] = createSignal('');

  function handleEnviar(e: Event) {
    e.preventDefault();
    if (!tipo()) { setErro('Selecione o tipo da ocorrência.'); return; }
    if (!descricao().trim()) { setErro('Descreva a ocorrência.'); return; }
    if (!nome().trim()) { setErro('Informe seu nome.'); return; }
    if (!empresa().trim()) { setErro('Informe sua empresa.'); return; }
    const q = qr();
    const m = material();
    if (!q || !m) return;
    addOcorrencia({
      qr_code_id: q.id,
      material_id: q.material_id,
      local_id: q.local_id,
      tipo_ocorrencia: tipo() as TipoOcorrencia,
      descricao: descricao(),
      nome_reportante: nome(),
      empresa_reportante: empresa(),
    });
    setEnviado(true);
    setShowForm(false);
    setTipo('');
    setDescricao('');
    setNome('');
    setEmpresa('');
    setErro('');
  }

  return (
    <div class="qr-page">
      <Show
        when={qr()}
        fallback={
          <div style={{ 'text-align': 'center', padding: '3rem 1rem' }}>
            <h2 style={{ 'margin-bottom': '0.5rem' }}>QR não encontrado</h2>
            <p style={{ color: 'rgba(226,232,240,0.6)', 'font-size': '0.9rem' }}>
              Código <strong>{params.codigo}</strong> não está cadastrado no sistema.
            </p>
          </div>
        }
      >
        <div class="qr-header">
          <div>
            <p style={{ 'font-size': '0.72rem', color: 'rgba(226,232,240,0.55)', 'margin-bottom': '0.3rem' }}>
              SRCM · JL
            </p>
            <h1 style={{ 'font-size': '1.25rem', 'font-weight': '800' }}>
              {material()?.descricao ?? '—'}
            </h1>
          </div>
          <span class="qr-badge-code">{params.codigo}</span>
        </div>

        <div class="qr-section">
          <h3>Identificação</h3>
          <div class="qr-info-grid">
            <Index
              each={[
                { label: 'Código interno', value: material()?.codigo_interno },
                { label: 'Tipo de estrutura', value: material()?.tipo_estrutura },
                { label: 'Qtd. no local', value: material()?.quantidade_total },
                { label: 'Status', value: material()?.status_operacional },
                { label: 'Local', value: local()?.nome_local },
                { label: 'Tipo de local', value: TIPO_LOCAL_LABEL[local()?.tipo_local ?? ''] },
                { label: 'Área', value: local()?.area },
                { label: 'Referência física', value: local()?.referencia_fisica },
              ]}
            >
              {(item) => (
                <div class="qr-info-item">
                  <div class="label">{item().label}</div>
                  <div class="value">{String(item().value ?? '—')}</div>
                </div>
              )}
            </Index>
          </div>
        </div>

        <div class="qr-section">
          <h3>Fabricação e pintura</h3>
          <div class="qr-info-grid">
            <Index
              each={[
                { label: 'Data de fabricação', value: formatDate(material()?.data_fabricacao ?? '') },
                { label: 'Data de pintura', value: formatDate(material()?.data_pintura ?? '') },
                { label: 'Tipo de pintura', value: material()?.tipo_pintura },
                { label: 'Resp. pintura', value: material()?.responsavel_pintura },
                { label: 'Proj. fabricação', value: material()?.projeto_fabricacao },
                { label: 'Proj. montagem', value: material()?.projeto_montagem },
                { label: 'Previsão montagem', value: formatDate(material()?.previsao_montagem ?? '') },
                { label: 'Chegada à Vale', value: formatDate(material()?.data_chegada_vale ?? '') },
              ]}
            >
              {(item) => (
                <div class="qr-info-item">
                  <div class="label">{item().label}</div>
                  <div class="value">{item().value || '—'}</div>
                </div>
              )}
            </Index>
          </div>
        </div>

        <div class="qr-section">
          <h3>Responsáveis</h3>
          <div class="qr-info-grid">
            <Index
              each={[
                { label: 'Responsável técnico', value: material()?.responsavel_tecnico },
                { label: 'Supervisor', value: material()?.supervisor_responsavel },
              ]}
            >
              {(item) => (
                <div class="qr-info-item">
                  <div class="label">{item().label}</div>
                  <div class="value">{item().value || '—'}</div>
                </div>
              )}
            </Index>
          </div>
          <Show when={material()?.observacoes}>
            <div
              class="qr-info-item"
              style={{ 'margin-top': '0.75rem', 'border-radius': '10px' }}
            >
              <div class="label">Observações</div>
              <div class="value">{material()?.observacoes}</div>
            </div>
          </Show>
        </div>

        <Show when={ocorrencias().length > 0}>
          <div class="qr-section">
            <h3>Ocorrências abertas</h3>
            <div style={{ display: 'grid', gap: '0.6rem' }}>
              <For each={ocorrencias().filter((o) => o.status !== 'resolvido')}>
                {(oc) => (
                  <div class="qr-info-item" style={{ display: 'flex', 'justify-content': 'space-between', 'align-items': 'flex-start', gap: '0.5rem' }}>
                    <div>
                      <TipoBadge tipo={oc.tipo_ocorrencia} />
                      <p style={{ 'margin-top': '0.35rem', 'font-size': '0.875rem' }}>{oc.descricao}</p>
                      <p style={{ 'font-size': '0.75rem', color: 'rgba(226,232,240,0.5)', 'margin-top': '0.25rem' }}>
                        {oc.nome_reportante} · {oc.empresa_reportante}
                      </p>
                    </div>
                    <StatusBadge status={oc.status} />
                  </div>
                )}
              </For>
            </div>
          </div>
        </Show>

        <Show when={enviado()}>
          <div class="alert alert-success">Ocorrência registrada com sucesso.</div>
        </Show>

        <Show
          when={!showForm()}
          fallback={
            <div class="report-form">
              <h3>Registrar ocorrência</h3>
              <Show when={erro()}>
                <div class="alert alert-error">{erro()}</div>
              </Show>
              <div class="tipo-grid">
                <Index
                  each={[
                    { value: 'nao_conformidade' as TipoOcorrencia, label: 'Não Conformidade', cls: 'tipo-nc' },
                    { value: 'aviso' as TipoOcorrencia, label: 'Aviso', cls: 'tipo-aviso' },
                    { value: 'melhoria' as TipoOcorrencia, label: 'Melhoria', cls: 'tipo-melhoria' },
                  ]}
                >
                  {(t) => (
                    <button
                      type="button"
                      class={`tipo-btn ${t().cls}${tipo() === t().value ? ' selected' : ''}`}
                      onClick={() => setTipo(t().value)}
                    >
                      {t().label}
                    </button>
                  )}
                </Index>
              </div>
              <form onSubmit={handleEnviar} style={{ display: 'grid', gap: '0.75rem' }}>
                <div class="field">
                  <label>Descrição</label>
                  <textarea
                    placeholder="Descreva o problema, aviso ou melhoria..."
                    value={descricao()}
                    onInput={(e) => setDescricao(e.currentTarget.value)}
                    rows={3}
                  />
                </div>
                <div style={{ display: 'grid', 'grid-template-columns': '1fr 1fr', gap: '0.75rem' }}>
                  <div class="field">
                    <label>Seu nome</label>
                    <input
                      type="text"
                      placeholder="Nome completo"
                      value={nome()}
                      onInput={(e) => setNome(e.currentTarget.value)}
                    />
                  </div>
                  <div class="field">
                    <label>Empresa</label>
                    <input
                      type="text"
                      placeholder="JL, Vale, ..."
                      value={empresa()}
                      onInput={(e) => setEmpresa(e.currentTarget.value)}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button type="submit" class="btn btn-primary" style={{ flex: 1 }}>
                    Enviar ocorrência
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={() => { setShowForm(false); setErro(''); }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          }
        >
          <button
            class="btn btn-primary w-full"
            style={{ 'justify-content': 'center', 'margin-top': '1rem' }}
            onClick={() => { setShowForm(true); setEnviado(false); }}
          >
            Reportar / Atualizar
          </button>
        </Show>
      </Show>
    </div>
  );
}
