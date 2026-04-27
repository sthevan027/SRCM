import { Router, Route } from '@solidjs/router';
import { Suspense } from 'solid-js';
import AdminLayout from '~/components/layout/AdminLayout';
import Home from '~/routes/index';
import Login from '~/routes/login';
import QRDetalhes from '~/routes/qr/[codigo]';
import AdminDashboard from '~/routes/admin/dashboard';
import Materiais from '~/routes/admin/materiais';
import Locais from '~/routes/admin/locais';
import QRCodesPage from '~/routes/admin/qrcodes';
import Ocorrencias from '~/routes/admin/ocorrencias';
import Usuarios from '~/routes/admin/usuarios';

export default function App() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', color: '#e2e8f0' }}>Carregando...</div>}>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/qr/:codigo" component={QRDetalhes} />
        <Route path="/admin" component={AdminLayout}>
          <Route path="/" component={AdminDashboard} />
          <Route path="/dashboard" component={AdminDashboard} />
          <Route path="/materiais" component={Materiais} />
          <Route path="/locais" component={Locais} />
          <Route path="/qrcodes" component={QRCodesPage} />
          <Route path="/ocorrencias" component={Ocorrencias} />
          <Route path="/usuarios" component={Usuarios} />
        </Route>
      </Router>
    </Suspense>
  );
}
