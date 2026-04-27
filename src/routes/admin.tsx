import { For } from "solid-js";
import { adminModules } from "~/lib/navigation";

export default function AdminHome() {
  return (
    <section class="admin-page">
      <h2>Núcleo administrativo</h2>
      <p>Visão inicial da área protegida, organizada por módulos.</p>

      <div class="admin-grid">
        <For each={adminModules}>
          {(module) => (
            <a class="admin-card panel-link" href={module.href}>
              <strong>{module.label}</strong>
              <span>{module.description}</span>
            </a>
          )}
        </For>
      </div>
    </section>
  );
}
