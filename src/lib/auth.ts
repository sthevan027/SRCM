const AUTH_STORAGE_KEY = "srcm:auth";

type AuthSession = {
  user: {
    email: string;
    role: "admin";
  };
};

export type LoginResult =
  | { ok: true; session: AuthSession }
  | { ok: false; message: string };

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}

export function logout() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function loginWithPassword(email: string, password: string): LoginResult {
  const normalizedEmail = email.trim().toLowerCase();

  const isValid =
    normalizedEmail === "admin@srcm.local" && password === "admin123";

  if (!isValid) {
    return {
      ok: false,
      message: "Usuário ou senha inválidos.",
    };
  }

  const session: AuthSession = {
    user: { email: normalizedEmail, role: "admin" },
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  }

  return { ok: true, session };
}

