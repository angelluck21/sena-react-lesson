import React, { useState, useEffect } from "react";

const Equipos = () => {
    const [formData, setFormData] = useState({
        teamName: "",
        participants: "",
        leader: "",
        game: "",
    });
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/allequipos") // Ajusta la URL según tu backend
            .then(response => response.json())
            .then(data => setGames(data))
            .catch(error => console.error("Error al obtener juegos:", error));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos del equipo:", formData);
        alert(`Equipo ${formData.teamName} registrado exitosamente`);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold text-center text-blue-500 mb-4">Registrar Equipo</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="block">
                    <span className="text-gray-700">Nombre del Equipo</span>
                    <input
                        type="text"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Cantidad de Participantes</span>
                    <input
                        type="number"
                        name="participants"
                        value={formData.participants}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Líder Actual</span>
                    <input
                        type="text"
                        name="leader"
                        value={formData.leader}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Juego a Jugar</span>
                    <select
                        name="game"
                        value={formData.game}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="" disabled>Selecciona un juego</option>
                        {games.map(game => (
                            <option key={game.id} value={game.name}>
                                {game.name}
                            </option>
                        ))}
                    </select>
                </label>

                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                    Registrar Equipo
                </button>
            </form>
        </div>
    );
};

export default Equipos;