import { Router, Route } from "@solidjs/router";
import { Suspense } from "solid-js";
import Home from "~/routes/index";

export default function App() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Router>
        <Route path="/" component={Home} />
      </Router>
    </Suspense>
  );
}
