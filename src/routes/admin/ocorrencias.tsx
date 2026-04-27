import { JSX, createSignal, For, Show, createMemo } from 'solid-js';
import { ocorrencias, updateStatus } from '~/stores/ocorrencias.store';
import { getMaterialById } from '~/stores/materiais.store';
import { getLocalById } from '~/stores/locais.store';
import { TipoBadge, StatusBadge } from '~/components/common/Badge';
import { currentUser } from '~/stores/auth.store';
import type { StatusOcorrencia, TipoOcorrencia } from '~/lib/types';

function formatDate(d: string): string {
  return new Date(d).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function Ocorrencias(): JSX.Element {
  const [filtroStatus, setFiltroStatus] = createSignal<StatusOcorrencia | ''>('');
  const [filtroTipo, setFiltroTipo] = createSignal<TipoOcorrencia | ''>('');
  const [selected, setSelected] = createSignal<string | null>(null);
  const [novoStatus, setNovoStatus] = createSignal<StatusOcorrencia>('em_andamento');
  const [comentario, setComentario] = createSignal('');
  const [erro, setErro] = createSignal('');

  const filtradas = createMemo(() => {
    let list = ocorrencias();
    if (filtroStatus()) list = list.filter((o) => o.status === filtroStatus());
    if (filtroTipo()) list = list.filter((o) => o.tipo_ocorrencia === filtroTipo());
    return [...list].sort(
      (a, b) => new Date(b.data_abertura).getTime() - new Date(a.data_abertura).getTime(),
    );
  });

  const selectedOc = createMemo(() =>
    selected() ? ocorrencias().find((o) => o.id === selected()) : undefined,
  );

  function handleAtualizar(e: Event) {
    e.preventDefault();
    if (!selected()) return;
    const user = currentUser();
    updateStatus(selected()!, novoStatus(), comentario(), user?.nome ?? 'Sistema');
    setSelected(null);
    setComentario('');
    setErro('');
  }

  return (
    <div>
      <div class="page-header">
        <div>
          <h2 class="page-title">Ocorrências</h2>
          <p class="page-subtitle">Registro e tratativa dos desvios operacionais</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', 'margin-bottom': '1.25rem', 'flex-wrap': 'wrap' }}>
        <select
          class="field"
          style={{ width: 'auto', padding: '0.5rem 0.75rem', 'border-radius': '8px', border: '1px solid var(--border)', background: 'rgba(2,6,23,0.3)', color: 'var(--text)', 'font-size': '0.875rem' }}
          value={filtroStatus()}
          onChange={(e) => setFiltroStatus(e.currentTarget.value as StatusOcorrencia | '')}
        >
          <option value="">Todos os status</option>
          <option value="aberto">Aberto</option>
          <option value="em_andamento">Em andamento</option>
          <option value="resolvido">Resolvido</option>
        </select>

        <select
          style={{ width: 'auto', padding: '0.5rem 0.75rem', 'border-radius': '8px', border: '1px solid var(--border)', background: 'rgba(2,6,23,0.3)', color: 'var(--text)', 'font-size': '0.875rem' }}
          value={filtroTipo()}
          onChange={(e) => setFiltroTipo(e.currentTarget.value as TipoOcorrencia | '')}
        >
          <option value="">Todos os tipos</option>
          <option value="nao_conformidade">Não Conformidade</option>
          <option value="aviso">Aviso</option>
          <option value="melhoria">Melhoria</option>
        </select>
      </div>

      <Show when={selected()}>
        <div class="card" style={{ 'margin-bottom': '1.5rem', 'border-color': 'rgba(56,189,248,0.25)' }}>
          <div style={{ display: 'flex', 'justify-content': 'space-between', 'align-items': 'flex-start', 'margin-bottom': '1rem' }}>
            <div>
              <h3 style={{ 'font-size': '1rem', 'font-weight': '700' }}>
                Atualizar ocorrência — {selectedOc()?.codigo_ocorrencia}
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem', 'margin-top': '0.4rem' }}>
                <Show when={selectedOc()}>
                  <TipoBadge tipo={selectedOc()!.tipo_ocorrencia} />
                  <StatusBadge status={selectedOc()!.status} />
                </Show>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" onClick={() => setSelected(null)}>Fechar</button>
          </div>

          <Show when={selectedOc()?.descricao}>
            <div
              class="card"
              style={{ 'margin-bottom': '1rem', background: 'rgba(255,255,255,0.02)', padding: '0.875rem' }}
            >
              <p style={{ 'font-size': '0.875rem' }}>{selectedOc()?.descricao}</p>
              <p style={{ 'font-size': '0.78rem', color: 'var(--text-muted)', 'margin-top': '0.4rem' }}>
                {selectedOc()?.nome_reportante} · {selectedOc()?.empresa_reportante} · {formatDate(selectedOc()?.data_abertura ?? '')}
              </p>
            </div>
          </Show>

          <Show when={(selectedOc()?.historico?.length ?? 0) > 0}>
            <div style={{ 'margin-bottom': '1rem' }}>
              <p style={{ 'font-size': '0.75rem', 'font-weight': '600', color: 'var(--text-muted)', 'text-transform': 'uppercase', 'letter-spacing': '0.06em', 'margin-bottom': '0.5rem' }}>
                Histórico
              </p>
              <For each={selectedOc()?.historico ?? []}>
                {(h) => (
                  <div style={{ 'font-size': '0.82rem', padding: '0.5rem 0', 'border-bottom': '1px solid var(--border)', display: 'flex', gap: '0.5rem', 'align-items': 'flex-start' }}>
                    <span class="badge badge-ativo" style={{ 'flex-shrink': 0 }}>{h.status_novo}</span>
                    <span>{h.comentario || h.acao} <span style={{ color: 'var(--text-muted)' }}>— {h.usuario_nome}</span></span>
                  </div>
                )}
              </For>
            </div>
          </Show>

          <Show when={selectedOc()?.status !== 'resolvido'}>
            <form onSubmit={handleAtualizar} style={{ display: 'grid', gap: '0.75rem' }}>
              <Show when={erro()}>
                <div class="alert alert-error">{erro()}</div>
              </Show>
              <div style={{ display: 'grid', 'grid-template-columns': '1fr 2fr', gap: '0.75rem' }}>
                <div class="field">
                  <label>Novo status</label>
                  <select value={novoStatus()} onChange={(e) => setNovoStatus(e.currentTarget.value as StatusOcorrencia)}>
                    <option value="em_andamento">Em andamento</option>
                    <option value="resolvido">Resolvido</option>
                    <option value="aberto">Reabrir</option>
                  </select>
                </div>
                <div class="field">
                  <label>Comentário</label>
                  <input
                    placeholder="Descreva a ação tomada..."
                    value={comentario()}
                    onInput={(e) => setComentario(e.currentTarget.value)}
                  />
                </div>
              </div>
              <button type="submit" class="btn btn-primary" style={{ 'justify-self': 'start' }}>
                Atualizar status
              </button>
            </form>
          </Show>
        </div>
      </Show>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Tipo</th>
              <th>Descrição</th>
              <th>Material / Local</th>
              <th>Reportante</th>
              <th>Data</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <For
              each={filtradas()}
              fallback={
                <tr>
                  <td colspan="8" class="empty-state">Nenhuma ocorrência encontrada.</td>
                </tr>
              }
            >
              {(oc) => {
                const mat = getMaterialById(oc.material_id);
                const loc = getLocalById(oc.local_id);
                return (
                  <tr>
                    <td class="font-mono" style={{ 'font-size': '0.8rem' }}>{oc.codigo_ocorrencia}</td>
                    <td><TipoBadge tipo={oc.tipo_ocorrencia} /></td>
                    <td
                      style={{
                        'max-width': '200px',
                        overflow: 'hidden',
                        'text-overflow': 'ellipsis',
                        'white-space': 'nowrap',
                        'font-size': '0.875rem',
                      }}
                    >
                      {oc.descricao}
                    </td>
                    <td style={{ 'font-size': '0.85rem' }}>
                      <div>{mat?.descricao ?? '—'}</div>
                      <div style={{ color: 'var(--text-muted)', 'font-size': '0.78rem' }}>{loc?.nome_local ?? '—'}</div>
                    </td>
                    <td style={{ 'font-size': '0.85rem' }}>
                      {oc.nome_reportante}
                      <div style={{ color: 'var(--text-muted)', 'font-size': '0.78rem' }}>{oc.empresa_reportante}</div>
                    </td>
                    <td style={{ 'font-size': '0.78rem', color: 'var(--text-muted)' }}>{formatDate(oc.data_abertura)}</td>
                    <td><StatusBadge status={oc.status} /></td>
                    <td>
                      <button
                        class="btn btn-secondary btn-sm"
                        onClick={() => {
                          setSelected(oc.id);
                          setNovoStatus(oc.status === 'aberto' ? 'em_andamento' : 'resolvido');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        Tratar
                      </button>
                    </td>
                  </tr>
                );
              }}
            </For>
          </tbody>
        </table>
      </div>
    </div>
  );
}
