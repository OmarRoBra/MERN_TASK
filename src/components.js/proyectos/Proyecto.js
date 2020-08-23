import React,{useContext} from 'react';
import proyectoContext from '../../context/Proyectos/proyectoContext'
import TareaContext from '../../context/Tareas/tareaContext'
const Proyecto = ({proyecto}) => {
    const proyectosContext=useContext(proyectoContext)
    const tareasContext=useContext(TareaContext)
    const {  proyectoAtual}=proyectosContext;
    const {filtrarTareas} =tareasContext

    //funcion  proyecto actual
    const seleccionar=id=>{
        proyectoAtual(id)
        filtrarTareas(id)
    }
    return ( 
        <li>
            <button
            type="button"
            className="btn btn-blank"
            onClick={()=>seleccionar(proyecto._id)}
    >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto
