export const TournamentModal = ({ 
    games, 
    tournament, 
    isShow, 
    onClose,
    onChangeTournament,
    onSubmit
}) => {
    if (!isShow) return null;


    const handleChange = (event) => {
        onChangeTournament({
            name: event.target.name,
            value: event.target.value
        })
    }
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="relative p-6 w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-700">
          <div className="flex items-center justify-between mb-4 border-b pb-2 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Crear nuevo torneo
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg p-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
  
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white">
                Nombre del torneo
              </label>
              <input
                value={tournament.nombre}
                onInput={(e) => handleChange(e)}
                type="text"
                id="nombreToreno"
                name="nombre"
                placeholder="Nombre del torneo"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                required
              />
            </div>
  
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="limite_equipos" className="block text-sm font-medium text-gray-700 dark:text-white">
                  Limite de Jugadores
                </label>
                <input
                  value={tournament.limite_equipos}
                  onInput={(e) => handleChange(e)}
                  type="number"
                  id="limite_equipos"
                  name="limite_equipos"
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="modalidad" className="block text-sm font-medium text-gray-700 dark:text-white">
                  Modalidad
                </label>
                <select
                  id="modalidad"
                  name="modalidad"
                  onChange={(event) => handleChange(event)}
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                >
                  <option>Selecciona una Modalidad</option>
                  <option value="duo">Duo</option>
                  <option value="individual">Individual</option>
                </select>
              </div>
            </div>
  
            <div>
            <select
                  onChange={(event) => handleChange(event)}
                  id="videojuego"
                  name="videojuego_id"
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                >
                  <option>Selecciona un Videojuego</option>
                  {
                    games.map((game) => {
                        return <option value={game.id} selected={tournament?.videojuego?.id === game.id}>{game.nombre}</option>
                    })
                  }
                </select>
            </div>
  
            <button
              type="button"
              onClick={onSubmit}
              className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1vf3h3a1 1 0 010 2h-3v3a1 1 0 01-2 0v-3H6a1 1 0 010-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Guardar
            </button>
          </form>
        </div>
      </div>
    );
  };