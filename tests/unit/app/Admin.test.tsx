import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import AdminHome from "~/routes/admin";

describe("Área administrativa", () => {
  it("deve exibir o núcleo administrativo", () => {
    render(() => <AdminHome />);
    expect(
      screen.getByRole("heading", { name: /Núcleo administrativo/i })
    ).toBeInTheDocument();
  });

  it("deve listar módulos iniciais", () => {
    render(() => <AdminHome />);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Materiais/i)).toBeInTheDocument();
  });
});
