import { JSX, Index } from 'solid-js';
import { A } from '@solidjs/router';
import { isAuthenticated } from '~/stores/auth.store';

export default function Home(): JSX.Element {
  return (
    <div class="public-page">
      <div class="public-card" style={{ 'max-width': '520px', 'text-align': 'center' }}>
        <div class="intro-line" />
        <p class="eyebrow">JL · Vale</p>
        <h1 style={{ 'font-size': '2rem', 'font-weight': '800', 'margin-bottom': '0.5rem' }}>
          SRCM
        </h1>
        <p class="lead" style={{ 'margin-bottom': '2rem' }}>
          Sistema de Rastreabilidade e Controle de Materiais.
          <br />
          Organização, rastreabilidade e controle dos materiais da obra.
        </p>

        <div
          style={{
            display: 'grid',
            'grid-template-columns': '1fr 1fr',
            gap: '0.75rem',
            'margin-bottom': '2rem',
          }}
        >
          <Index
            each={[
              { icon: '📦', title: 'Materiais', desc: 'Cadastro e rastreio de estruturas, peças e equipamentos' },
              { icon: '📍', title: 'Locais', desc: 'Pátios, malhões e áreas de armazenamento identificados' },
              { icon: '🔲', title: 'QR Code', desc: 'Código único para consulta rápida em campo' },
              { icon: '⚠️', title: 'Ocorrências', desc: 'Registro de não conformidades, avisos e melhorias' },
            ]}
          >
            {(item) => (
              <div class="panel" style={{ 'text-align': 'left' }}>
                <span style={{ 'font-size': '1.25rem' }}>{item().icon}</span>
                <strong style={{ 'font-size': '0.9rem' }}>{item().title}</strong>
                <span style={{ 'font-size': '0.8rem', color: 'rgba(226,232,240,0.65)' }}>
                  {item().desc}
                </span>
              </div>
            )}
          </Index>
        </div>

        <A
          href={isAuthenticated() ? '/admin/dashboard' : '/login'}
          class="btn btn-primary w-full"
          style={{ 'justify-content': 'center' }}
        >
          {isAuthenticated() ? 'Ir para o Dashboard' : 'Acessar o Sistema'}
        </A>
      </div>
    </div>
  );
}
