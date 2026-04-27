import { JSX, Show, For } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';
import { isAuthenticated, currentUser, logout } from '~/stores/auth.store';
import type { RouteSectionProps } from '@solidjs/router';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/materiais', label: 'Materiais' },
  { href: '/admin/locais', label: 'Locais' },
  { href: '/admin/qrcodes', label: 'QR Codes' },
  { href: '/admin/ocorrencias', label: 'Ocorrências' },
  { href: '/admin/usuarios', label: 'Usuários' },
];

export default function AdminLayout(props: RouteSectionProps): JSX.Element {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <Show
      when={isAuthenticated()}
      fallback={<RedirectToLogin />}
    >
      <div class="admin-layout">
        <aside class="admin-sidebar">
          <div class="sidebar-brand">
            <h1>SRCM</h1>
            <p>Sistema de Rastreabilidade</p>
          </div>
          <nav class="sidebar-nav">
            <div class="sidebar-section">Menu</div>
            <For each={navItems}>
              {(item) => (
                <A href={item.href} class="sidebar-link" activeClass="active">
                  {item.label}
                </A>
              )}
            </For>
          </nav>
          <div class="sidebar-footer">
            <div style={{ 'font-weight': '600', 'margin-bottom': '0.25rem' }}>
              {currentUser()?.nome}
            </div>
            <div style={{ 'font-size': '0.75rem', 'margin-bottom': '0.75rem' }}>
              {currentUser()?.perfil} · {currentUser()?.empresa}
            </div>
            <button class="btn btn-secondary btn-sm w-full" onClick={handleLogout}>
              Sair
            </button>
          </div>
        </aside>
        <main class="admin-main">{props.children}</main>
      </div>
    </Show>
  );
}

function RedirectToLogin(): JSX.Element {
  const navigate = useNavigate();
  navigate('/login');
  return <></>;
}
