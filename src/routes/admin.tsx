import PageShell from "~/components/PageShell";
import { adminModules } from "~/lib/navigation";

export default function AdminHome() {
  return (
    <PageShell
      badge="Administração"
      title="Núcleo administrativo"
      lead="Primeira camada da área protegida, organizada por módulos."
    >
      <section class="panel-grid">
        {adminModules.map((module) => (
          <a class="panel panel-link" href={module.href}>
            <strong>{module.label}</strong>
            <span>{module.description}</span>
          </a>
        ))}
      </section>
      <p class="footer">Base inicial para cadastro, gestão e auditoria.</p>
    </PageShell>
  );
}
