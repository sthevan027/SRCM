import { createSignal } from 'solid-js';
import { storage, KEYS } from '~/lib/storage';
import type { Local } from '~/lib/types';

const [locais, setLocais] = createSignal<Local[]>(storage.get<Local>(KEYS.LOCAIS));

export { locais };

export function refreshLocais(): void {
  setLocais(storage.get<Local>(KEYS.LOCAIS));
}

export function addLocal(local: Local): void {
  storage.add(KEYS.LOCAIS, local);
  refreshLocais();
}

export function getLocalById(id: string): Local | undefined {
  return locais().find((l) => l.id === id);
}
