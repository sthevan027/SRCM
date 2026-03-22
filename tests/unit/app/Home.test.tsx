import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import Home from "~/routes/index";

/**
 * Teste de infraestrutura: validar que a rota principal carrega.
 * Conforme docs/testes.md - validação de rotas básicas
 */
describe("Página inicial", () => {
  it("deve renderizar o título SRCM", () => {
    render(() => <Home />); // Solid Testing Library: passa função que retorna componente
    expect(screen.getByRole("heading", { name: /SRCM/i })).toBeInTheDocument();
  });

  it("deve exibir descrição do sistema", () => {
    render(() => <Home />);
    expect(
      screen.getByText(/Sistema de Rastreabilidade e Controle de Materiais/i)
    ).toBeInTheDocument();
  });

  it("deve mencionar QR Code na página", () => {
    render(() => <Home />);
    expect(screen.getByText(/QR Code/i)).toBeInTheDocument();
  });
});
