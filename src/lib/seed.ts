import { storage, KEYS } from './storage';
import type { Usuario, Local, Material, QRCodeItem } from './types';

export function seedIfNeeded(): void {
  if (localStorage.getItem(KEYS.SEEDED)) return;

  const adminUser: Usuario = {
    id: 'user-1',
    nome: 'Administrador',
    email: 'admin@srcm.com',
    senha_hash: 'admin123',
    perfil: 'admin',
    empresa: 'JL',
    status: 'ativo',
    created_at: new Date().toISOString(),
  };

  const locais: Local[] = [
    {
      id: 'local-1',
      codigo_local: 'PT-01',
      nome_local: 'Pátio 01 — Estruturas',
      tipo_local: 'patio',
      descricao_local: 'Pátio principal de armazenamento de estruturas metálicas.',
      area: 'Área Norte',
      referencia_fisica: 'Próximo ao galpão 3',
      status_local: 'ativo',
      created_at: new Date().toISOString(),
    },
    {
      id: 'local-2',
      codigo_local: 'ML-01',
      nome_local: 'Malhão 01',
      tipo_local: 'malhao',
      descricao_local: 'Malhão de tubulações e conexões.',
      area: 'Área Central',
      referencia_fisica: 'Setor B, fileira 2',
      status_local: 'ativo',
      created_at: new Date().toISOString(),
    },
  ];

  const materiais: Material[] = [
    {
      id: 'mat-1',
      codigo_interno: 'EST-001',
      descricao: 'Viga Metálica Principal H500',
      tipo_estrutura: 'Viga H',
      quantidade_total: 12,
      data_fabricacao: '2024-10-15',
      data_pintura: '2024-11-01',
      tipo_pintura: 'Epóxi bicomponente',
      responsavel_pintura: 'João Silva',
      projeto_fabricacao: 'PRJ-FAB-2024-001',
      projeto_montagem: 'PRJ-MON-2024-001',
      previsao_montagem: '2025-03-10',
      data_chegada_vale: '2024-12-01',
      responsavel_tecnico: 'Eng. Carlos Rocha',
      supervisor_responsavel: 'Marcos Lima',
      status_operacional: 'ativo',
      local_id: 'local-1',
      observacoes: 'Aguardando montagem na estrutura principal.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'mat-2',
      codigo_interno: 'TUB-042',
      descricao: 'Tubulação DN200 — Trecho 4',
      tipo_estrutura: 'Tubulação',
      quantidade_total: 8,
      data_fabricacao: '2024-09-20',
      data_pintura: '2024-10-05',
      tipo_pintura: 'Zarcão + Esmalte',
      responsavel_pintura: 'Pedro Alves',
      projeto_fabricacao: 'PRJ-FAB-2024-002',
      projeto_montagem: 'PRJ-MON-2024-002',
      previsao_montagem: '2025-02-15',
      data_chegada_vale: '2024-11-10',
      responsavel_tecnico: 'Eng. Ana Costa',
      supervisor_responsavel: 'Marcos Lima',
      status_operacional: 'ativo',
      local_id: 'local-2',
      observacoes: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  const qrcodes: QRCodeItem[] = [
    {
      id: 'qr-1',
      codigo_qr: 'QR-EST-001',
      url_consulta: `${window.location.origin}/qr/QR-EST-001`,
      material_id: 'mat-1',
      local_id: 'local-1',
      status_qr: 'ativo',
      data_geracao: new Date().toISOString(),
    },
    {
      id: 'qr-2',
      codigo_qr: 'QR-TUB-042',
      url_consulta: `${window.location.origin}/qr/QR-TUB-042`,
      material_id: 'mat-2',
      local_id: 'local-2',
      status_qr: 'ativo',
      data_geracao: new Date().toISOString(),
    },
  ];

  storage.set(KEYS.USUARIOS, [adminUser]);
  storage.set(KEYS.LOCAIS, locais);
  storage.set(KEYS.MATERIAIS, materiais);
  storage.set(KEYS.QRCODES, qrcodes);
  storage.set(KEYS.OCORRENCIAS, []);
  localStorage.setItem(KEYS.SEEDED, '1');
}

// Side-effect: run before any store module initializes its signals from localStorage.
// Import this file first in main.tsx so the execution order guarantee of ES static
// imports ensures storage is populated before signal creation.
seedIfNeeded();
