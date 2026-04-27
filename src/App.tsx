import { Router, Route } from "@solidjs/router";
import { Suspense } from "solid-js";
import Home from "~/routes/index";
import Login from "~/routes/login";
import QRDetails from "~/routes/qr/[codigo]";
import RequireAdmin from "~/components/RequireAdmin";
import AdminLayout from "~/components/AdminLayout";
import AdminHome from "~/routes/admin";
import AdminDashboard from "~/routes/admin/dashboard";
import Materiais from "~/routes/admin/materiais";
import Locais from "~/routes/admin/locais";
import QRCodes from "~/routes/admin/qrcodes";
import Ocorrencias from "~/routes/admin/ocorrencias";
import Usuarios from "~/routes/admin/usuarios";

export default function App() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/qr/:codigo" component={QRDetails} />
        <Route
          path="/admin"
          component={() => (
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          )}
        >
          <Route path="/" component={AdminHome} />
          <Route path="dashboard" component={AdminDashboard} />
          <Route path="materiais" component={Materiais} />
          <Route path="locais" component={Locais} />
          <Route path="qrcodes" component={QRCodes} />
          <Route path="ocorrencias" component={Ocorrencias} />
          <Route path="usuarios" component={Usuarios} />
        </Route>
      </Router>
    </Suspense>
  );
}
