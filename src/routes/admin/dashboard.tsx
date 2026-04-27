import { JSX, For, createMemo, Index } from 'solid-js';
import { A } from '@solidjs/router';
import { materiais } from '~/stores/materiais.store';
import { qrcodes } from '~/stores/qrcodes.store';
import { ocorrencias } from '~/stores/ocorrencias.store';
import { locais } from '~/stores/locais.store';
import { TipoBadge, StatusBadge } from '~/components/common/Badge';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AdminDashboard(): JSX.Element {
  const abertas = createMemo(() => ocorrencias().filter((o) => o.status === 'aberto').length);
  const emAndamento = createMemo(() => ocorrencias().filter((o) => o.status === 'em_andamento').length);
  const resolvidas = createMemo(() => ocorrencias().filter((o) => o.status === 'resolvido').length);
  const qrsAtivos = createMemo(() => qrcodes().filter((q) => q.status_qr === 'ativo').length);

  const recentes = createMemo(() =>
    [...ocorrencias()]
      .sort((a, b) => new Date(b.data_abertura).getTime() - new Date(a.data_abertura).getTime())
      .slice(0, 10),
  );

  const localNome = (id: string) => locais().find((l) => l.id === id)?.nome_local ?? '—';
  const materialDesc = (id: string) => materiais().find((m) => m.id === id)?.descricao ?? '—';

  return (
    <div>
      <div class="page-header">
        <div>
          <h2 class="page-title">Dashboard</h2>
          <p class="page-subtitle">Visão geral da operação</p>
        </div>
      </div>

      <div class="stats-grid">
        <Index
          each={[
            { label: 'Materiais cadastrados', value: materiais().length, color: 'var(--accent)' },
            { label: 'QR Codes ativos', value: qrsAtivos(), color: '#a78bfa' },
            { label: 'Locais cadastrados', value: locais().length, color: '#34d399' },
            { label: 'Ocorrências abertas', value: abertas(), color: '#f87171' },
            { label: 'Em andamento', value: emAndamento(), color: '#fbbf24' },
            { label: 'Resolvidas', value: resolvidas(), color: '#4ade80' },
          ]}
        >
          {(s) => (
            <div class="stat-card">
              <div class="stat-value" style={{ color: s().color }}>
                {s().value}
              </div>
              <div class="stat-label">{s().label}</div>
            </div>
          )}
        </Index>
      </div>

      <div
        style={{
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'space-between',
          'margin-bottom': '1rem',
        }}
      >
        <h3 style={{ 'font-size': '1rem', 'font-weight': '700' }}>Ocorrências recentes</h3>
        <A href="/admin/ocorrencias" class="btn btn-secondary btn-sm">
          Ver todas
        </A>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Tipo</th>
              <th>Material</th>
              <th>Local</th>
              <th>Reportante</th>
              <th>Data</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <For
              each={recentes()}
              fallback={
                <tr>
                  <td colspan="7" class="empty-state">
                    Nenhuma ocorrência registrada ainda.
                  </td>
                </tr>
              }
            >
              {(oc) => (
                <tr>
                  <td class="font-mono" style={{ 'font-size': '0.8rem' }}>
                    {oc.codigo_ocorrencia}
                  </td>
                  <td>
                    <TipoBadge tipo={oc.tipo_ocorrencia} />
                  </td>
                  <td style={{ 'max-width': '180px', overflow: 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }}>
                    {materialDesc(oc.material_id)}
                  </td>
                  <td>{localNome(oc.local_id)}</td>
                  <td style={{ 'font-size': '0.85rem' }}>
                    {oc.nome_reportante}
                    <span class="text-muted"> · {oc.empresa_reportante}</span>
                  </td>
                  <td style={{ 'font-size': '0.8rem', color: 'var(--text-muted)' }}>
                    {formatDate(oc.data_abertura)}
                  </td>
                  <td>
                    <StatusBadge status={oc.status} />
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </div>
  );
}
