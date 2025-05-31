import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">Inicio</Link>
          </li>
          <li>
            <Link to="/torneo" className="text-white hover:text-gray-300">Torneo</Link>
          </li>
      
          <li>
            <Link to="/jugadores" className="text-white hover:text-gray-300">jugadores</Link>
          </li>
           <li>
            <Link to="/Equipos" className="text-white hover:text-gray-300">Equipos</Link>
          </li>
           <li>
            <Link to="/videojuegos" className="text-white hover:text-gray-300">videojuegos</Link>
          </li>
        </ul>
      </nav>

      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;