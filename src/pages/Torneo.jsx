import axios from 'axios';
import {  useEffect, useState } from 'react';
import { LuPencil, LuTrash } from "react-icons/lu";
import { TournamentModal } from '../components/TournamentModal';

import { ToastContainer, toast } from 'react-toastify';

function Torneos() {
  const [tournaments, setTournaments] = useState([]);
  const [isModalShow, setIsModalShow] = useState(false);
  const [currentTournament, setCurrentTournament] = useState({});
  const [games, setGames] = useState([]);


  useEffect(() => {
    fetchTournament();
    fetchVideoGames();
  }, []);

  const fetchTournament = async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/tournament');
      if (response.status === 200){
        console.log(response.data);
        setTournaments(response.data.data);
      }
  }

  const fetchVideoGames = () => {
    axios.get(import.meta.env.VITE_TORNEO_ENDPOINT + '/api/videojuegos').then((response) => {
      setGames(response.data.data);
    }).catch(error => {
      console.log(error);
    })
  }

  const setModalEditInfo = (tournament) => {
    setIsModalShow(true);
    setCurrentTournament(tournament);
  }

  const handleChangeTournament = (event) => {
    setCurrentTournament({
      ...currentTournament,
      [event.name]: event.value
    })
  }
  
  const createOrUpdateTournament = async () => {
    const data = {
      nombre: currentTournament.nombre,
      limite_equipos: currentTournament.limite_equipos,
      modalidad: currentTournament.modalidad,
      videojuego_id: currentTournament.videojuego_id
    };
    if (currentTournament.id) {
      try {
        const response = await axios.put(
          import.meta.env.VITE_TORNEO_ENDPOINT + '/api/update-tournament/' + currentTournament.id, data);
        toast("Actualización exitosa")
        console.log( response.data)
        setIsModalShow(false);
        fetchTournament();
      } catch (error) {
        console.error("Error al actualizar", error)
      }
    } 
    else {
      try {
        const response = await axios.post(
          import.meta.env.VITE_TORNEO_ENDPOINT + '/api/create-tournament/' + currentTournament.videojuego_id, {
            ...data, 
            premio: "Una puecca"
          });
        toast("Creación exitosa")
        console.log( response.data)
        setIsModalShow(false);
        fetchTournament();
      } catch (error) {
        console.error("Error al actualizar", error)
      }
    }
  }

  const removeTournament = async (tournamentId) => {
    const isConfirm = confirm("Estas seguro que deseas borrar?");
    if (isConfirm) {
     try {
      await axios.delete(
        import.meta.env.VITE_TORNEO_ENDPOINT + '/api/remove-tournament/' + tournamentId);
      toast("Eliminiación exitosa");
      fetchTournament();
     } catch (error) {
      console.error("Error al actualizar", error);
     }
    }
  }

  const openTournamentModal = () => {
    setCurrentTournament({});
    setIsModalShow(true);
  }


  return (
    <>
      <TournamentModal 
        games={games}
        tournament={currentTournament} 
        isShow={isModalShow}
        onClose={() => setIsModalShow(false)}
        onChangeTournament={(e) => handleChangeTournament(e)}
        onSubmit={() => createOrUpdateTournament()}
      />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-16 px-4">
      <h1 className="text-4xl font-bold text-black mb-8">
        Torneos
      </h1>
      <button className='bg-green-700 text-white rounded shadow-md p-2 my-4' onClick={() => openTournamentModal()}> Crear Torneo </button>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr >
              <th className='px-6 py-3'>Nombre del torneo</th>
              <th className='px-6 py-3'>Limite de jugadores</th>
              <th className='px-6 py-3'>Modalidad</th>
              <th className='px-6 py-3'>Video Juego</th>
              <th className='px-6 py-3'></th>
            </tr>
          </thead>
        <tbody>
          {
          tournaments.length && tournaments.map(tournament => {
            return <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                
              <td className='px-6'>{tournament.nombre}</td>
              <td className='px-6'>{tournament.limite_equipos}</td>
              <td className='px-6'>{tournament.modalidad}</td>
              <td className='px-6'>{tournament.videojuego.nombre}</td>
              <td className='px-6'colSpan={3}>
                <button onClick={() => setModalEditInfo(tournament) } className='bg-blue-600 text-white rounded p-2 mr-2 my-2' data-modal-target="crud-modal" data-modal-toggle="crud-modal" type='button'> <LuPencil/></button>
                <button className='bg-red-600 text-white rounded p-2 my-2' onClick={() => removeTournament(tournament.id)}> <LuTrash/></button>
              </td>
            </tr>
          })
        }
      </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
    </>
  
  );
}

export default Torneos;