import { JSX, createSignal, Show, For } from 'solid-js';
import { materiais, addMaterial } from '~/stores/materiais.store';
import { locais } from '~/stores/locais.store';
import { createQRCode, getQRByMaterialId } from '~/stores/qrcodes.store';
import { MaterialStatusBadge } from '~/components/common/Badge';
import type { Material, StatusMaterial } from '~/lib/types';

function newId() {
  return `mat-${Date.now()}`;
}

function formatDate(d: string): string {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('pt-BR');
}

export default function Materiais(): JSX.Element {
  const [showForm, setShowForm] = createSignal(false);
  const [erro, setErro] = createSignal('');

  const [codigo, setCodigo] = createSignal('');
  const [descricao, setDescricao] = createSignal('');
  const [tipo, setTipo] = createSignal('');
  const [qtd, setQtd] = createSignal('1');
  const [localId, setLocalId] = createSignal('');
  const [dataFab, setDataFab] = createSignal('');
  const [dataPint, setDataPint] = createSignal('');
  const [tipoPint, setTipoPint] = createSignal('');
  const [respPint, setRespPint] = createSignal('');
  const [projFab, setProjFab] = createSignal('');
  const [projMon, setProjMon] = createSignal('');
  const [prevMon, setPrevMon] = createSignal('');
  const [chegada, setChegada] = createSignal('');
  const [respTec, setRespTec] = createSignal('');
  const [supervisor, setSupervisor] = createSignal('');
  const [obs, setObs] = createSignal('');

  function resetForm() {
    setCodigo(''); setDescricao(''); setTipo(''); setQtd('1'); setLocalId('');
    setDataFab(''); setDataPint(''); setTipoPint(''); setRespPint('');
    setProjFab(''); setProjMon(''); setPrevMon(''); setChegada('');
    setRespTec(''); setSupervisor(''); setObs(''); setErro('');
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (!codigo().trim() || !descricao().trim()) {
      setErro('Código interno e descrição são obrigatórios.');
      return;
    }
    if (!localId()) {
      setErro('Selecione um local de armazenamento.');
      return;
    }
    const id = newId();
    const mat: Material = {
      id,
      codigo_interno: codigo().trim(),
      descricao: descricao().trim(),
      tipo_estrutura: tipo().trim(),
      quantidade_total: Number(qtd()) || 1,
      local_id: localId(),
      data_fabricacao: dataFab(),
      data_pintura: dataPint(),
      tipo_pintura: tipoPint().trim(),
      responsavel_pintura: respPint().trim(),
      projeto_fabricacao: projFab().trim(),
      projeto_montagem: projMon().trim(),
      previsao_montagem: prevMon(),
      data_chegada_vale: chegada(),
      responsavel_tecnico: respTec().trim(),
      supervisor_responsavel: supervisor().trim(),
      status_operacional: 'ativo' as StatusMaterial,
      observacoes: obs().trim(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    addMaterial(mat);
    createQRCode(id, localId());
    resetForm();
    setShowForm(false);
  }

  return (
    <div>
      <div class="page-header">
        <div>
          <h2 class="page-title">Materiais</h2>
          <p class="page-subtitle">Cadastro e rastreabilidade dos materiais da obra</p>
        </div>
        <button class="btn btn-primary" onClick={() => { resetForm(); setShowForm(!showForm()); }}>
          {showForm() ? 'Cancelar' : '+ Novo Material'}
        </button>
      </div>

      <Show when={showForm()}>
        <div class="card" style={{ 'margin-bottom': '1.5rem' }}>
          <h3 style={{ 'font-size': '1rem', 'font-weight': '700', 'margin-bottom': '1.25rem' }}>
            Cadastrar novo material
          </h3>
          <Show when={erro()}>
            <div class="alert alert-error">{erro()}</div>
          </Show>
          <form onSubmit={handleSubmit}>
            <p style={{ 'font-size': '0.75rem', color: 'var(--text-muted)', 'margin-bottom': '0.75rem', 'font-weight': '600', 'text-transform': 'uppercase', 'letter-spacing': '0.06em' }}>
              Identificação
            </p>
            <div class="form-grid" style={{ 'margin-bottom': '1.25rem' }}>
              <div class="field">
                <label>Código interno *</label>
                <input placeholder="EST-001" value={codigo()} onInput={(e) => setCodigo(e.currentTarget.value)} />
              </div>
              <div class="field">
                <label>Descrição *</label>
                <input placeholder="Viga Metálica H500" value={descricao()} onInput={(e) => setDescricao(e.currentTarget.value)} />
              </div>
              <div class="field">
                <label>Tipo de estrutura</label>
                <input placeholder="Viga H" value={tipo()} onInput={(e) => setTipo(e.currentTarget.value)} />
              </div>
              <div class="field">
                <label>Quantidade total</label>
                <input type="number" min="1" value={qtd()} onInput={(e) => setQtd(e.currentTarget.value)} />
              </div>
              <div class="field">
                <label>Local de armazenamento *</label>
                <select value={localId()} onChange={(e) => setLocalId(e.currentTarget.value)}>
                  <option value="">Selecione...</option>
                  <For each={locais().filter((l) => l.status_local === 'ativo')}>
                    {(l) => <option value={l.id}>{l.codigo_local} — {l.nome_local}</option>}
                  </For>
                </select>
              </div>
            </div>

            <p style={{ 'font-size': '0.75rem', color: 'var(--text-muted)', 'margin-bottom': '0.75rem', 'font-weight': '600', 'text-transform': 'uppercase', 'letter-spacing': '0.06em' }}>
              Fabricação e pintura
            </p>
            <div class="form-grid" style={{ 'margin-bottom': '1.25rem' }}>
              <div class="field">
                <label>Data de fabricação</label>
                <input type="date" value={dataFab()} onInput={(e) => setDataFab(e.currentTarget.value)} />
              </div>
              <div class="field">
                <label>Data de pintura</label>
                <input type="date" value={dataPint()} onInput={(e) => setDataPint(e.currentTarget.value)} />
              </div>
              <div class="field">
                <label>Tipo de pintura</label>
                <input placeholder="Epóxi bicomponente" value={tipoPint()} onInput={(e) => setTipoPint(e.currentTarget.value)} />
              </div>
              <div class="field">
                <label>Responsável pela pintura</label>
                <input placeholder="Nome" value={respPint()} onInput={(e) => setRespPint(e.currentTarget.value)} />
              </div>
              <div class="field">
                <label>Projeto de fabricação</label>
                <input placeholder="PRJ-FAB-2024-001" value={projFab()} onInput={(e) => setProjFab(e.currentTarget.value)} />
              </div>
              <div class="field">
                <label>Projeto de montagem</label>
                <input placeholder="PRJ-MON-2024-001" value={projMon()} onInput={(e) => setProjMon(e.currentTarget.value)} />
              </div>
              <div class="field">
                <label>Previsão de montagem</label>
                <input type="date" value={prevMon()} onInput={(e) => setPrevMon(e.currentTarget.value)} />
              </div>
              <div class="field">
                <label>Chegada à Vale</label>
                <input type="date" value={chegada()} onInput={(e) => setChegada(e.currentTarget.value)} />
              </div>
            </div>

            <p style={{ 'font-size': '0.75rem', color: 'var(--text-muted)', 'margin-bottom': '0.75rem', 'font-weight': '600', 'text-transform': 'uppercase', 'letter-spacing': '0.06em' }}>
              Responsáveis
            </p>
            <div class="form-grid" style={{ 'margin-bottom': '1.25rem' }}>
              <div class="field">
                <label>Responsável técnico</label>
                <input placeholder="Eng. Carlos Rocha" value={respTec()} onInput={(e) => setRespTec(e.currentTarget.value)} />
              </div>
              <div class="field">
                <label>Supervisor responsável</label>
                <input placeholder="Marcos Lima" value={supervisor()} onInput={(e) => setSupervisor(e.currentTarget.value)} />
              </div>
              <div class="field" style={{ 'grid-column': '1 / -1' }}>
                <label>Observações</label>
                <textarea
                  placeholder="Observações adicionais..."
                  value={obs()}
                  onInput={(e) => setObs(e.currentTarget.value)}
                  rows={2}
                />
              </div>
            </div>

            <button type="submit" class="btn btn-primary">
              Salvar material e gerar QR Code
            </button>
          </form>
        </div>
      </Show>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Descrição</th>
              <th>Tipo</th>
              <th>Qtd</th>
              <th>Fabricação</th>
              <th>QR Code</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <For
              each={materiais()}
              fallback={
                <tr>
                  <td colspan="7" class="empty-state">Nenhum material cadastrado ainda.</td>
                </tr>
              }
            >
              {(m) => {
                const qr = getQRByMaterialId(m.id);
                return (
                  <tr>
                    <td class="font-mono" style={{ 'font-size': '0.85rem' }}>{m.codigo_interno}</td>
                    <td style={{ 'font-weight': '500' }}>{m.descricao}</td>
                    <td>{m.tipo_estrutura || '—'}</td>
                    <td>{m.quantidade_total}</td>
                    <td style={{ 'font-size': '0.85rem' }}>{formatDate(m.data_fabricacao)}</td>
                    <td>
                      {qr ? (
                        <a
                          href={`/qr/${qr.codigo_qr}`}
                          class="font-mono"
                          style={{ 'font-size': '0.78rem', color: 'var(--accent)', 'text-decoration': 'none' }}
                          target="_blank"
                        >
                          {qr.codigo_qr}
                        </a>
                      ) : (
                        <span class="text-muted text-sm">—</span>
                      )}
                    </td>
                    <td>
                      <MaterialStatusBadge status={m.status_operacional} />
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
