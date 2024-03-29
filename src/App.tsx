import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prodotti" />
        <Route path="/statistiche" />
        <Route path="/fornitori" />
        <Route path="/clienti" />
        <Route path="/acquisti" />
        <Route path="/vendite" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
