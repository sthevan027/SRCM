import type { JSX } from "solid-js";
import { A, useLocation, useNavigate } from "@solidjs/router";
import { For, Show, createMemo } from "solid-js";
import { adminModules } from "~/lib/navigation";
import { getSession, logout } from "~/lib/auth";

type AdminLayoutProps = {
  children: JSX.Element;
};

export default function AdminLayout(props: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const session = createMemo(() => getSession());

  const activePath = createMemo(() => location.pathname);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div class="admin-shell">
      <aside class="admin-sidebar">
        <div class="admin-brand">
          <div class="admin-logo" aria-hidden="true" />
          <div class="admin-brand-text">
            <strong>SRCM</strong>
            <span>Administração</span>
          </div>
        </div>

        <nav class="admin-nav" aria-label="Menu administrativo">
          <For each={adminModules}>
            {(module) => {
              const isActive = createMemo(() =>
                activePath().startsWith(module.href),
              );

              return (
                <A
                  href={module.href}
                  class="admin-nav-item"
                  classList={{ "is-active": isActive() }}
                >
                  <span class="admin-nav-label">{module.label}</span>
                  <span class="admin-nav-desc">{module.description}</span>
                </A>
              );
            }}
          </For>
        </nav>

        <div class="admin-sidebar-footer">
          <Show when={session()?.user}>
            {(user) => (
              <p class="admin-user">
                <span class="admin-user-label">Logado como</span>
                <strong class="admin-user-value">{user().email}</strong>
              </p>
            )}
          </Show>
          <button type="button" class="admin-logout" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </aside>

      <div class="admin-main">
        <header class="admin-header">
          <div>
            <p class="admin-kicker">Sistema</p>
            <h1 class="admin-title">SRCM</h1>
          </div>
        </header>

        <main class="admin-content">
          {props.children}
        </main>
      </div>
    </div>
  );
}

