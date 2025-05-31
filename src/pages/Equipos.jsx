import React, { useState, useEffect } from "react";
import axios from "axios";

const Equipos = () => {
    const [formData, setFormData] = useState({
        teamName: "",
        leader: "",
        game: "",
        participants: [], 
    });
    const [games, setGames] = useState([]);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/jugadores")
        .then((response) => {
            setPlayers(response.data.jugadores);
        })
        .catch((error) => {
            console.error("Error al obtener jugadores:", error);
        });
}, []);
    
    


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePlayerSelection = (playerId) => {
        setFormData((prevState) => {
            const updatedParticipants = prevState.participants.includes(playerId)
                ? prevState.participants.filter((id) => id !== playerId)
                : [...prevState.participants, playerId];

            return { ...prevState, participants: updatedParticipants };
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
                    <span className="text-gray-700">Seleccionar Jugadores</span>
                    <div className="mt-1 border border-gray-300 rounded-md p-2">
                        {players.map((player) => (
                            <label key={player.id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.participants.includes(player.id)}
                                    onChange={() => handlePlayerSelection(player.id)}
                                />
                                {player.nombre}
                            </label>
                        ))}
                    </div>
                </label>

                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                    Registrar Equipo
                </button>
            </form>
        </div>
    );
};

export default Equipos;