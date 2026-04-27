import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { Router, Route } from "@solidjs/router";
import Home from "~/routes/index";

function renderHome() {
  return render(() => (
    <Router>
      <Route path="/*" component={Home} />
    </Router>
  ));
}

describe("Página inicial", () => {
  it("deve renderizar o título SRCM", () => {
    renderHome();
    expect(screen.getByRole("heading", { name: /SRCM/i })).toBeInTheDocument();
  });

  it("deve exibir descrição do sistema", () => {
    renderHome();
    expect(
      screen.getByText(/Sistema de Rastreabilidade e Controle de Materiais/i)
    ).toBeInTheDocument();
  });

  it("deve mencionar QR Code na página", () => {
    renderHome();
    expect(screen.getByText(/QR Code/i)).toBeInTheDocument();
  });
});
