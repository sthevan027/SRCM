import { JSX, createSignal, Show, For } from 'solid-js';
import { locais, addLocal } from '~/stores/locais.store';
import type { Local, TipoLocal, StatusLocal } from '~/lib/types';

const TIPO_LABELS: Record<TipoLocal, string> = {
  patio: 'Pátio',
  malhao: 'Malhão',
  equipamento: 'Equipamento',
  estrutura: 'Estrutura',
  outro: 'Outro',
};

function newId() {
  return `local-${Date.now()}`;
}

export default function Locais(): JSX.Element {
  const [showForm, setShowForm] = createSignal(false);
  const [codigo, setCodigo] = createSignal('');
  const [nome, setNome] = createSignal('');
  const [tipo, setTipo] = createSignal<TipoLocal>('patio');
  const [descricao, setDescricao] = createSignal('');
  const [area, setArea] = createSignal('');
  const [ref, setRef] = createSignal('');
  const [erro, setErro] = createSignal('');

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (!codigo().trim() || !nome().trim()) {
      setErro('Código e nome são obrigatórios.');
      return;
    }
    const local: Local = {
      id: newId(),
      codigo_local: codigo().trim(),
      nome_local: nome().trim(),
      tipo_local: tipo(),
      descricao_local: descricao().trim(),
      area: area().trim(),
      referencia_fisica: ref().trim(),
      status_local: 'ativo' as StatusLocal,
      created_at: new Date().toISOString(),
    };
    addLocal(local);
    setCodigo('');
    setNome('');
    setTipo('patio');
    setDescricao('');
    setArea('');
    setRef('');
    setErro('');
    setShowForm(false);
  }

  return (
    <div>
      <div class="page-header">
        <div>
          <h2 class="page-title">Locais</h2>
          <p class="page-subtitle">Pátios, malhões, equipamentos e áreas de armazenamento</p>
        </div>
        <button class="btn btn-primary" onClick={() => setShowForm(!showForm())}>
          {showForm() ? 'Cancelar' : '+ Novo Local'}
        </button>
      </div>

      <Show when={showForm()}>
        <div class="card" style={{ 'margin-bottom': '1.5rem' }}>
          <h3 style={{ 'font-size': '1rem', 'font-weight': '700', 'margin-bottom': '1.25rem' }}>
            Cadastrar novo local
          </h3>
          <Show when={erro()}>
            <div class="alert alert-error">{erro()}</div>
          </Show>
          <form onSubmit={handleSubmit}>
            <div class="form-grid" style={{ 'margin-bottom': '1rem' }}>
              <div class="field">
                <label>Código do local *</label>
                <input placeholder="PT-01" value={codigo()} onInput={(e) => setCodigo(e.currentTarget.value)} />
              </div>
              <div class="field">
                <label>Nome do local *</label>
                <input placeholder="Pátio 01 — Estruturas" value={nome()} onInput={(e) => setNome(e.currentTarget.value)} />
              </div>
              <div class="field">
                <label>Tipo</label>
                <select value={tipo()} onChange={(e) => setTipo(e.currentTarget.value as TipoLocal)}>
                  <For each={Object.keys(TIPO_LABELS) as TipoLocal[]}>
                    {(k) => <option value={k}>{TIPO_LABELS[k]}</option>}
                  </For>
                </select>
              </div>
              <div class="field">
                <label>Área</label>
                <input placeholder="Área Norte" value={area()} onInput={(e) => setArea(e.currentTarget.value)} />
              </div>
              <div class="field">
                <label>Referência física</label>
                <input placeholder="Próximo ao galpão 3" value={ref()} onInput={(e) => setRef(e.currentTarget.value)} />
              </div>
              <div class="field" style={{ 'grid-column': '1 / -1' }}>
                <label>Descrição</label>
                <textarea
                  placeholder="Descrição do local..."
                  value={descricao()}
                  onInput={(e) => setDescricao(e.currentTarget.value)}
                  rows={2}
                />
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Salvar local</button>
          </form>
        </div>
      </Show>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Área</th>
              <th>Referência</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <For
              each={locais()}
              fallback={
                <tr>
                  <td colspan="6" class="empty-state">Nenhum local cadastrado ainda.</td>
                </tr>
              }
            >
              {(l) => (
                <tr>
                  <td class="font-mono" style={{ 'font-size': '0.85rem' }}>{l.codigo_local}</td>
                  <td style={{ 'font-weight': '500' }}>{l.nome_local}</td>
                  <td>{TIPO_LABELS[l.tipo_local]}</td>
                  <td>{l.area || '—'}</td>
                  <td>{l.referencia_fisica || '—'}</td>
                  <td>
                    <span class={l.status_local === 'ativo' ? 'badge badge-ativo' : 'badge badge-inativo'}>
                      {l.status_local === 'ativo' ? 'Ativo' : 'Inativo'}
                    </span>
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
