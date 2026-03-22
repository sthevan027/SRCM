import { describe, it, expect } from "vitest";

/**
 * Teste de infraestrutura: validar que a base do projeto está configurada.
 * Conforme docs/testes.md - Etapa 1: Base técnica
 */
describe("Infraestrutura do projeto", () => {
  it("deve ter ambiente de testes configurado", () => {
    expect(typeof describe).toBe("function");
    expect(typeof it).toBe("function");
    expect(typeof expect).toBe("function");
  });

  it("deve executar asserções básicas", () => {
    expect(1 + 1).toBe(2);
    expect("SRCM").toBe("SRCM");
  });

  it("deve ter dom disponível para testes de componentes", () => {
    const div = document.createElement("div");
    div.textContent = "SRCM";
    document.body.appendChild(div);
    expect(div.textContent).toBe("SRCM");
    document.body.removeChild(div);
  });
});
