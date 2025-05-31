import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Torneo from "./pages/Torneo"
import Layout from "./pages/layout"
import Equipos from "./pages/Equipos"
import Videojuegos from "./pages/videojuegos"
import Jugadores from "./pages/jugadores";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="torneo" element={<Torneo />} />  
            <Route path="Equipos" element={<Equipos />} /> 
             <Route path="videojuegos" element={<Videojuegos />} />
              <Route path="jugadores" element={<Jugadores />} />  
        </Route>
      </Routes>
    </BrowserRouter>
  );
}