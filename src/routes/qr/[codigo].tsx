import { useParams } from "@solidjs/router";
import PageShell from "~/components/PageShell";

export default function QRDetails() {
  const params = useParams();
  const codigo = () => params.codigo || "QR-000";

  return (
    <PageShell
      badge="Consulta por QR"
      title={`Material ${codigo()}`}
      lead="Página leve para uso em campo, com dados resumidos e rápido acesso."
    >
      <section class="panel-grid">
        <article class="panel">
          <strong>Código</strong>
          <span>{codigo()}</span>
        </article>
        <article class="panel">
          <strong>Status</strong>
          <span>Em conformidade</span>
        </article>
        <article class="panel">
          <strong>Local</strong>
          <span>Pátio principal</span>
        </article>
      </section>
      <section class="stack">
        <p>
          Essa tela será a base para exibir descrição, responsáveis, anexos e
          ocorrências vinculadas ao QR.
        </p>
        <button type="button">Reportar / Atualizar</button>
      </section>
    </PageShell>
  );
}
