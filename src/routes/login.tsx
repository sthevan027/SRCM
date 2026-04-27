import { JSX, createSignal, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { login, isAuthenticated } from '~/stores/auth.store';

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const [email, setEmail] = createSignal('');
  const [senha, setSenha] = createSignal('');
  const [erro, setErro] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  if (isAuthenticated()) {
    navigate('/admin/dashboard');
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    setErro('');
    setLoading(true);
    const ok = login(email(), senha());
    setLoading(false);
    if (ok) {
      navigate('/admin/dashboard');
    } else {
      setErro('E-mail ou senha incorretos.');
    }
  }

  return (
    <div class="public-page">
      <div class="public-card">
        <div class="intro-line" />
        <p class="eyebrow">SRCM · JL</p>
        <h1 style={{ 'font-size': '1.5rem', 'font-weight': '800', 'margin-bottom': '0.4rem' }}>
          Acesso ao sistema
        </h1>
        <p class="lead" style={{ 'margin-bottom': '1.75rem', 'font-size': '0.875rem' }}>
          Área administrativa protegida.
        </p>

        <Show when={erro()}>
          <div class="alert alert-error">{erro()}</div>
        </Show>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <div class="field">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="admin@srcm.com"
              value={email()}
              onInput={(e) => setEmail(e.currentTarget.value)}
              required
              autocomplete="email"
            />
          </div>
          <div class="field">
            <label>Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={senha()}
              onInput={(e) => setSenha(e.currentTarget.value)}
              required
              autocomplete="current-password"
            />
          </div>
          <button type="submit" class="btn btn-primary w-full" disabled={loading()}>
            {loading() ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p
          style={{
            'margin-top': '1.25rem',
            'font-size': '0.78rem',
            color: 'rgba(226,232,240,0.5)',
            'text-align': 'center',
          }}
        >
          Credenciais padrão: admin@srcm.com / admin123
        </p>
      </div>
    </div>
  );
}
