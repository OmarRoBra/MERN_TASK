import React,{useContext,useEffect} from 'react';
import Sidebar from '../Layout/Sidebar'
import Barra from '../Layout/Barra'
import Formtares from '../tareas/Formtarea'
import Listado from '../tareas/Listado'
import AuthContext from '../../context/Autenticacion/AuthContext'

const Proyectos = () => {
    //extraer informacion de la autenticacion 
    const authContext= useContext(AuthContext);
    const {usuarioAutenticado}=authContext;

    useEffect(() => {
      usuarioAutenticado();
        // eslint-disable-next-line
    }, [])


    return ( 
        <div className="contenedor-app">
           <Sidebar />

            <div className="seccion-principal">
                <Barra />
                <main>
                <Formtares />
                    <div className="contenedor-tareas">
                     <Listado />
                    </div>
                </main>

            </div>

        </div>
     );
}
 
export default Proyectos;