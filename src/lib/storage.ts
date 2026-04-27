export const KEYS = {
  MATERIAIS: 'srcm_materiais',
  LOCAIS: 'srcm_locais',
  QRCODES: 'srcm_qrcodes',
  OCORRENCIAS: 'srcm_ocorrencias',
  USUARIOS: 'srcm_usuarios',
  AUTH: 'srcm_auth',
  SEEDED: 'srcm_seeded',
} as const;

function get<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]') as T[];
  } catch {
    return [];
  }
}

function set<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export const storage = {
  KEYS,
  get,
  set,
  getOne<T extends { id: string }>(key: string, id: string): T | undefined {
    return get<T>(key).find((item) => item.id === id);
  },
  add<T>(key: string, item: T): void {
    const items = get<T>(key);
    items.push(item);
    set(key, items);
  },
  update<T extends { id: string }>(key: string, id: string, updates: Partial<T>): void {
    const items = get<T>(key);
    const idx = items.findIndex((item) => item.id === id);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...updates };
      set(key, items);
    }
  },
  remove<T extends { id: string }>(key: string, id: string): void {
    set(
      key,
      get<T>(key).filter((item) => item.id !== id),
    );
  },
};
