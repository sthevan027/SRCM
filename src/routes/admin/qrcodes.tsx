import { JSX, For, createResource } from 'solid-js';
import { qrcodes, inactivateQRCode } from '~/stores/qrcodes.store';
import { getMaterialById } from '~/stores/materiais.store';
import { getLocalById } from '~/stores/locais.store';
import { generateQRDataURL } from '~/lib/qr';
import { QRStatusBadge } from '~/components/common/Badge';

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString('pt-BR');
}

function QRImage(props: { url: string }) {
  const [src] = createResource(() => props.url, generateQRDataURL);
  return (
    <img
      src={src() ?? ''}
      alt="QR Code"
      style={{ width: '64px', height: '64px', 'border-radius': '4px', background: 'white' }}
    />
  );
}

export default function QRCodesPage(): JSX.Element {
  return (
    <div>
      <div class="page-header">
        <div>
          <h2 class="page-title">QR Codes</h2>
          <p class="page-subtitle">QR Codes gerados automaticamente ao cadastrar materiais</p>
        </div>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>QR</th>
              <th>Código</th>
              <th>Material</th>
              <th>Local</th>
              <th>Data geração</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <For
              each={qrcodes()}
              fallback={
                <tr>
                  <td colspan="7" class="empty-state">Nenhum QR Code gerado ainda.</td>
                </tr>
              }
            >
              {(qr) => {
                const mat = getMaterialById(qr.material_id);
                const loc = getLocalById(qr.local_id);
                return (
                  <tr>
                    <td>
                      <QRImage url={qr.url_consulta} />
                    </td>
                    <td class="font-mono" style={{ 'font-size': '0.82rem' }}>
                      {qr.codigo_qr}
                    </td>
                    <td>{mat?.descricao ?? '—'}</td>
                    <td>{loc?.nome_local ?? '—'}</td>
                    <td style={{ 'font-size': '0.85rem' }}>{formatDate(qr.data_geracao)}</td>
                    <td>
                      <QRStatusBadge status={qr.status_qr} />
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <a
                          href={qr.url_consulta}
                          target="_blank"
                          class="btn btn-secondary btn-sm"
                        >
                          Ver
                        </a>
                        {qr.status_qr === 'ativo' && (
                          <button
                            class="btn btn-danger btn-sm"
                            onClick={() => {
                              if (confirm('Inativar este QR Code?')) inactivateQRCode(qr.id);
                            }}
                          >
                            Inativar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }}
            </For>
          </tbody>
        </table>
      </div>
    </div>
  );
}
