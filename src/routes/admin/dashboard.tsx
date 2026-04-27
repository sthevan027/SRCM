export default function AdminDashboard() {
  return (
    <section class="admin-page">
      <h2>Painel operacional</h2>
      <p>Estrutura inicial para acompanhar materiais, locais e ocorrências.</p>

      <div class="admin-grid">
        <article class="admin-card">
          <strong>Materiais</strong>
          <p>0 cadastrados</p>
        </article>
        <article class="admin-card">
          <strong>QR Codes</strong>
          <p>0 emitidos</p>
        </article>
        <article class="admin-card">
          <strong>Ocorrências</strong>
          <p>0 abertas</p>
        </article>
      </div>
    </section>
  );
}
