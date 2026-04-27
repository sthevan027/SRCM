import PageShell from "~/components/PageShell";
import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import { loginWithPassword } from "~/lib/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal<string | null>(null);

  function handleLogin() {
    setError(null);

    const result = loginWithPassword(email(), password());
    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate("/admin", { replace: true });
  }

  return (
    <PageShell
      badge="Área administrativa"
      title="Acesso protegido"
      lead="Base inicial para autenticação e gestão do SRCM."
    >
      <form class="form-card">
        <label class="field">
          <span>Usuário</span>
          <input
            type="email"
            autocomplete="username"
            placeholder="admin@srcm.local"
            value={email()}
            onInput={(event) => setEmail(event.currentTarget.value)}
          />
        </label>
        <label class="field">
          <span>Senha</span>
          <input
            type="password"
            autocomplete="current-password"
            placeholder="admin123"
            value={password()}
            onInput={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        {error() ? <p class="error">{error()}</p> : null}
        <button type="button" onClick={handleLogin}>
          Entrar
        </button>
      </form>
      <p class="footer">
        Login de teste: <strong>admin@srcm.local</strong> /{" "}
        <strong>admin123</strong>
      </p>
    </PageShell>
  );
}
