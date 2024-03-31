import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Statistiche from "./pages/Statistiche";
import Prodotti from "./pages/Prodotti";
import Vendite from "./pages/Vendite";
import Fornitori from "./pages/Fornitori"
import Acquisti from "./pages/Acquisti"
import Clienti from "./pages/Clienti";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prodotti" element={<Prodotti />} />
        <Route path="/statistiche" element={<Statistiche />} />
        <Route path="/fornitori" element={<Fornitori />}/>
        <Route path="/clienti" element={<Clienti />}/>
        <Route path="/acquisti" element={<Acquisti />}/>
        <Route path="/vendite" element={<Vendite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
