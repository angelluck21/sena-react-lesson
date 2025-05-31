import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";

function Jugadores() {
  const [formData, setFormData] = useState({
    nombre: "",
    idJuego: "",
    correo: "",
    numero: "",
  });
  const [jugadores, setjugadores] = useState([]);
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

  useEffect(() => {
    obtenerjugadores();
  }, []);

  function obtenerjugadores() {
    axios.get("http://127.0.0.1:8000/api/jugadores")
      .then((response) => {g
        console.log("Datos obtenidos:", response.data.jugadores);
        setjugadores(response.data.jugadores);
      })
      .catch((error) => {
        console.error("Error al obtener jugadores:", error);
      });
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(import.meta.env.VITE_TORNEO_ENDPOINT + "/api/createplayer", formData)
      .then(() => {
        setMensaje({ texto: "¡Jugador creado exitosamente!", tipo: "success" });
        obtenerjugadores();
        setTimeout(() => setMensaje({ texto: "", tipo: "" }), 3000);
      })
      .catch(() => {
        setMensaje({ texto: "Error al crear jugador", tipo: "error" });
        setTimeout(() => setMensaje({ texto: "", tipo: "" }), 3000);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold text-center mb-4 text-gray-700">Registrar Jugador</h2>

        {mensaje.texto && (
          <div className={`text-center p-2 mb-4 rounded-lg ${mensaje.tipo === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
            {mensaje.texto}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">Nombre del jugador</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange}
                 placeholder="Ingrese el nombre" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">ID de Juego</label>
          <input type="text" name="idJuego" value={formData.idJuego} onChange={handleChange}
                 placeholder="Ingrese el ID de juego" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">Correo Electrónico</label>
          <input type="email" name="correo" value={formData.correo} onChange={handleChange}
                 placeholder="Ingrese su correo" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">Número de Teléfono</label>
          <input type="tel" name="numero" value={formData.numero} onChange={handleChange}
                 placeholder="Ingrese su número" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          Crear Jugador
        </button>
      </form>

      <div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="p-4">Nombre del jugador</th>
              <th className="p-4">ID juego</th>
              <th className="p-4">Correo</th>
              <th className="p-4">Número</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {jugadores && jugadores.map((jugador) => (
              <tr key={jugador.id}>
                <td>{jugador.nombre}</td>
                <td>{jugador.idJuego}</td>
                <td>{jugador.correo}</td>
                <td>{jugador.numero}</td>
                <td>
                  <button className="bg-blue-600 text-white rounded p-2 mr-2 my-2" type="button"><Pencil /></button>
                  <button className="bg-red-600 text-white rounded p-2 my-2"><Trash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Jugadores;