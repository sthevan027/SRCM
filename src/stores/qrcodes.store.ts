import { createSignal } from 'solid-js';
import { storage, KEYS } from '~/lib/storage';
import { generateCodigoQR } from '~/lib/qr';
import type { QRCodeItem } from '~/lib/types';

const [qrcodes, setQRCodes] = createSignal<QRCodeItem[]>(
  storage.get<QRCodeItem>(KEYS.QRCODES),
);

export { qrcodes };

export function refreshQRCodes(): void {
  setQRCodes(storage.get<QRCodeItem>(KEYS.QRCODES));
}

export function createQRCode(materialId: string, localId: string): QRCodeItem {
  const codigo = generateCodigoQR();
  const qr: QRCodeItem = {
    id: `qr-${Date.now()}`,
    codigo_qr: codigo,
    url_consulta: `${window.location.origin}/qr/${codigo}`,
    material_id: materialId,
    local_id: localId,
    status_qr: 'ativo',
    data_geracao: new Date().toISOString(),
  };
  storage.add(KEYS.QRCODES, qr);
  refreshQRCodes();
  return qr;
}

export function inactivateQRCode(id: string): void {
  storage.update<QRCodeItem>(KEYS.QRCODES, id, {
    status_qr: 'inativo',
    data_inativacao: new Date().toISOString(),
  });
  refreshQRCodes();
}

export function getQRByMaterialId(materialId: string): QRCodeItem | undefined {
  return qrcodes().find((qr) => qr.material_id === materialId && qr.status_qr === 'ativo');
}

export function getQRByCodigo(codigo: string): QRCodeItem | undefined {
  return qrcodes().find((qr) => qr.codigo_qr === codigo);
}
