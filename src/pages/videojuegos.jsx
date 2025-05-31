import axios from "axios";
import { useEffect, useState } from "react";
import {LuPencil, LuTrash} from "react-icons/lu"
import { toast, ToastContainer } from "react-toastify";



function Videojuegos() {
    const [videojuegos, setVideojuegos] = useState([]);
    const [videojuegoForm, setVideojuegoForm] = useState({});

    useEffect(() => {
        obtenerVideojuegos();
    }, []);
    function obtenerVideojuegos(){
        axios.get("http://127.0.0.1:8000/api/videojuegos").then((response) => {
            console.log(response.data.videojuegos)
            setVideojuegos(response.data.videojuegos);
        }).finally(() => {
            console.log(videojuegos);
        });
    }

    function guardarVideojuego() {
        axios.post("http://127.0.0.1:8000/api/guardar-videojuego", videojuegoForm).then(response => {
            toast("Guardado exitoso");
            obtenerVideojuegos();
        })
    }
    
    function obtenerValordeInput(e) {
        const obj = {
            ...videojuegoForm,
            [e.target.name]: e.target.value,
        }
        setVideojuegoForm(obj);
    }
    return <>
    <div className="grid grid-cols-2 gap-2 mt-8">
    <div className="p-4">
        <form >
        <div>
            <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre videojuego</label>
            <input onInput={(event) => obtenerValordeInput(event)} name="nombre" type="text" id="nombre" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre videojuego" required />
        </div>
        <div>
            <label for="tipo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo videojuego</label>
            <input onInput={obtenerValordeInput} name="tipo" type="text" id="tipo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="tipo videojuego" required />
        </div>
        <button onClick={guardarVideojuego} type="button" className="bg-green-600 rounded p-2 my-4 text-white">Guardar</button>
        </form>
      </div>
      <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
         
            <tr>
                <th className="p-4">Nombre de videojuego</th>
                <th className="p-4">Tipo de videojuego</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
          {
            videojuegos.map(videojuego => {
                return  <tr>
                    <td>{videojuego.nombre}</td>
                    <td>{videojuego.tipo}</td>
                    <td>
                       <button className='bg-blue-600 text-white rounded p-2 mr-2 my-2' type='button'> <LuPencil/></button>
                       <button className='bg-red-600 text-white rounded p-2 my-2'> <LuTrash/></button>         
                </td>
                </tr>
            })
          }
           
        </tbody>
       </table>
      </div>
      <ToastContainer/>
    </div>
    
   
    </>
}

export default Videojuegos;