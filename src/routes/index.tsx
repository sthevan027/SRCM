import PageShell from "~/components/PageShell";
import { publicLinks } from "~/lib/navigation";

export default function Home() {
  return (
    <PageShell
      badge="SRCM-JL"
      title="SRCM"
      lead="Sistema de Rastreabilidade e Controle de Materiais para consulta por QR Code e gestão operacional."
    >
      <p>
        Bem-vindo ao SRCM. A navegação abaixo separa a consulta pública da área
        administrativa.
      </p>
      <div class="panel-grid">
        {publicLinks.map((link) => (
          <a class="panel panel-link" href={link.href}>
            <strong>{link.label}</strong>
            <span>{link.description}</span>
          </a>
        ))}
      </div>
      <div class="info">
        <span class="badge">Desenvolvedor: Sthevan Santos</span>
        <span class="badge">Arquiteto: Victor</span>
      </div>
      <p class="footer">Sistema leve para uso em campo.</p>
    </PageShell>
  );
}
