import QRCode from 'qrcode';

export async function generateQRDataURL(text: string): Promise<string> {
  return QRCode.toDataURL(text, {
    width: 256,
    margin: 2,
    color: { dark: '#000000', light: '#ffffff' },
  });
}

export function generateCodigoQR(): string {
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `QR-${Date.now()}-${suffix}`;
}
