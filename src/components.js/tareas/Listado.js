
import React,{Fragment,useContext} from 'react';
import proyectoContext from '../../context/Proyectos/proyectoContext'
import TareaContext from '../../context/Tareas/tareaContext'
import Tarea from './Tareas'
import {CSSTransition,TransitionGroup} from 'react-transition-group'

const Listado = () => {
    const proyectosContext=useContext(proyectoContext)
     const {proyecto, eliminarProyecto}=proyectosContext;
     const tareasContext=useContext(TareaContext)
     const {tareasproyecto} =tareasContext

    
    if(proyecto===null)return <h2>Selecciona un proyecto</h2>;
    const [proyectoActual]=proyecto;

    const clickEliminar=()=>{
        eliminarProyecto(proyectoActual._id)
    }
    return ( <Fragment>
        <h2>Proyecto: {proyecto[0].nombre}</h2>

        <ul className="listado-tareas">
            {tareasproyecto.length===0 ?(<li className="tarea"><p>No hay tareas</p></li>)
            :<TransitionGroup>
              { tareasproyecto.map(tarea=>(
                 <CSSTransition
                 key={tarea._id}
                 timeout={200}
                 classNames="tarea"
                 >
                      <Tarea  info={tarea}/> 
                 </CSSTransition>
            ))}    
            </TransitionGroup>}
            
            <button type="button"
        className="btn btn-primario"
        onClick={clickEliminar}>Eliminar Proyecto &times; </button>

        </ul>
       
    </Fragment> );
}
 
export default Listado;