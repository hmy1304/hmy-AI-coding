import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Statistics from "./pages/Statistics";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Header />

      <main className="container">
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/transactions"
            element={<Transactions />}
          />

          <Route
            path="/statistics"
            element={<Statistics />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;