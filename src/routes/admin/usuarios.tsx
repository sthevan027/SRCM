import { JSX, For } from 'solid-js';
import { storage, KEYS } from '~/lib/storage';
import type { Usuario } from '~/lib/types';

const PERFIL_LABELS: Record<string, string> = {
  admin: 'Administrador',
  operador: 'Operador',
  fiscal: 'Fiscal',
  colaborador: 'Colaborador',
};

export default function Usuarios(): JSX.Element {
  const usuarios = () => storage.get<Usuario>(KEYS.USUARIOS);

  return (
    <div>
      <div class="page-header">
        <div>
          <h2 class="page-title">Usuários</h2>
          <p class="page-subtitle">Perfis e acessos ao sistema</p>
        </div>
      </div>

      <div class="card" style={{ 'margin-bottom': '1.5rem', background: 'rgba(245,158,11,0.06)', 'border-color': 'rgba(245,158,11,0.2)' }}>
        <p style={{ 'font-size': '0.875rem', color: 'rgba(252,211,77,0.9)' }}>
          Gestão completa de usuários será implementada na Fase 2.
          Por enquanto, o usuário administrador padrão é criado automaticamente no primeiro acesso.
        </p>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Perfil</th>
              <th>Empresa</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <For each={usuarios()}>
              {(u) => (
                <tr>
                  <td style={{ 'font-weight': '500' }}>{u.nome}</td>
                  <td style={{ 'font-size': '0.875rem' }}>{u.email}</td>
                  <td>{PERFIL_LABELS[u.perfil] ?? u.perfil}</td>
                  <td>{u.empresa}</td>
                  <td>
                    <span class={u.status === 'ativo' ? 'badge badge-ativo' : 'badge badge-inativo'}>
                      {u.status === 'ativo' ? 'Ativo' : 'Inativo'}
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
