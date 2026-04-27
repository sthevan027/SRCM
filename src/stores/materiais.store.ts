import { createSignal } from 'solid-js';
import { storage, KEYS } from '~/lib/storage';
import type { Material } from '~/lib/types';

const [materiais, setMateriais] = createSignal<Material[]>(
  storage.get<Material>(KEYS.MATERIAIS),
);

export { materiais };

export function refreshMateriais(): void {
  setMateriais(storage.get<Material>(KEYS.MATERIAIS));
}

export function addMaterial(material: Material): void {
  storage.add(KEYS.MATERIAIS, material);
  refreshMateriais();
}

export function updateMaterial(id: string, updates: Partial<Material>): void {
  storage.update<Material>(KEYS.MATERIAIS, id, updates);
  refreshMateriais();
}

export function getMaterialById(id: string): Material | undefined {
  return materiais().find((m) => m.id === id);
}
