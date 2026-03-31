import PageShell from "~/components/PageShell";

export default function AdminDashboard() {
  return (
    <PageShell
      badge="Dashboard"
      title="Painel operacional"
      lead="Estrutura inicial para acompanhar materiais, locais e ocorrências."
    >
      <section class="panel-grid">
        <article class="panel">
          <strong>Materiais</strong>
          <span>0 cadastrados</span>
        </article>
        <article class="panel">
          <strong>QR Codes</strong>
          <span>0 emitidos</span>
        </article>
        <article class="panel">
          <strong>Ocorrências</strong>
          <span>0 abertas</span>
        </article>
      </section>
      <section class="stack">
        <p>
          Essa área vai concentrar filtros, tratativas e indicadores da
          operação.
        </p>
      </section>
    </PageShell>
  );
}
