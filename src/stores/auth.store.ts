import { createSignal } from 'solid-js';
import { storage, KEYS } from '~/lib/storage';
import type { Usuario } from '~/lib/types';

function loadSavedUser(): Usuario | null {
  try {
    const raw = localStorage.getItem(KEYS.AUTH);
    return raw ? (JSON.parse(raw) as Usuario) : null;
  } catch {
    return null;
  }
}

export const [currentUser, setCurrentUser] = createSignal<Usuario | null>(loadSavedUser());

export const isAuthenticated = () => currentUser() !== null;

export function login(email: string, senha: string): boolean {
  const usuarios = storage.get<Usuario>(KEYS.USUARIOS);
  const user = usuarios.find(
    (u) => u.email === email && u.senha_hash === senha && u.status === 'ativo',
  );
  if (user) {
    setCurrentUser(user);
    localStorage.setItem(KEYS.AUTH, JSON.stringify(user));
    return true;
  }
  return false;
}

export function logout(): void {
  setCurrentUser(null);
  localStorage.removeItem(KEYS.AUTH);
}
