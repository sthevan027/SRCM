import PageShell from "~/components/PageShell";

export default function Login() {
  return (
    <PageShell
      badge="Área administrativa"
      title="Acesso protegido"
      lead="Base inicial para autenticação e gestão do SRCM."
    >
      <form class="form-card">
        <label class="field">
          <span>Usuário</span>
          <input type="text" placeholder="nome@empresa.com" />
        </label>
        <label class="field">
          <span>Senha</span>
          <input type="password" placeholder="••••••••" />
        </label>
        <button type="button">Entrar</button>
      </form>
      <p class="footer">Login real será ligado à API da aplicação.</p>
    </PageShell>
  );
}
