import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { Router, Route } from "@solidjs/router";
import AdminDashboard from "~/routes/admin/dashboard";

function renderDashboard() {
  return render(() => (
    <Router>
      <Route path="/*" component={AdminDashboard} />
    </Router>
  ));
}

describe("Área administrativa", () => {
  it("deve exibir o painel operacional", () => {
    renderDashboard();
    expect(
      screen.getByRole("heading", { name: /Dashboard/i })
    ).toBeInTheDocument();
  });

  it("deve exibir indicadores de materiais e ocorrências", () => {
    renderDashboard();
    expect(screen.getByText(/Materiais cadastrados/i)).toBeInTheDocument();
    expect(screen.getByText(/Ocorrências abertas/i)).toBeInTheDocument();
  });
});
