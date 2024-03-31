import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Statistiche from "./pages/Statistiche";
import Prodotti from "./pages/Prodotti";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prodotti" element={<Prodotti />} />
        <Route path="/statistiche" element={<Statistiche />} />
        <Route path="/fornitori" />
        <Route path="/clienti" />
        <Route path="/acquisti" />
        <Route path="/vendite" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
