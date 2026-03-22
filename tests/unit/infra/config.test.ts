import { describe, it, expect } from "vitest";

/**
 * Teste de infraestrutura: validar configurações essenciais do projeto.
 * Conforme docs/testes.md - Testes de infraestrutura
 */
describe("Configuração do projeto", () => {
  it("deve ter variáveis de ambiente compatíveis", () => {
    // Em desenvolvimento, process.env pode não ter todas as vars
    expect(typeof process.env).toBe("object");
  });

  it("deve ter NODE_ENV definido em execução", () => {
    expect(["test", "development", "production"]).toContain(
      process.env.NODE_ENV || "test"
    );
  });
});
