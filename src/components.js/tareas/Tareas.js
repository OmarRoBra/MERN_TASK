import React,{useContext} from 'react';
import TareaContext from '../../context/Tareas/tareaContext'
import proyectoContext from '../../context/Proyectos/proyectoContext'

const Tarea = ({info}) => {
    const tareasContext=useContext(TareaContext)
    const {eliminarTaks, filtrarTareas,cambiaEstado,tareaActual} =tareasContext;
    const proyectosContext=useContext(proyectoContext)
    const {  proyecto}=proyectosContext;
  
    
    const tareaEliminar=id=>{
        eliminarTaks(id,proyecto[0]._id)
        filtrarTareas(proyecto[0]._id)
    }
    const editarEstado=tarea=>{
        if(tarea.estado){
            tarea.estado=false;
        }else{
            tarea.estado=true;
        }
       cambiaEstado(tarea)
    }
    const selectTask=tarea=>{
        tareaActual(tarea);

    }
return ( 
<li className="tarea sombra">

<p>{info.nombre}</p>
<div className="estado">
    {info.estado
    ?(<button 
    type="button" 
    className="completo"  onClick={()=>editarEstado(info)}> Completo</button>)
    :(<button 
        type="button" 
        className="incompleto" onClick={()=>editarEstado(info)}> InCompleto</button>)
    }
</div>
<div className="acciones">
    <button
    type="button"
    className="btn btn-primario"
    onClick={()=>selectTask(info)}
    >Editar</button>
    <button
    type="button"
    className="btn btn-secundario"
    onClick={()=>tareaEliminar(info._id)} 
    >Eliminar</button>
</div>
</li> );
}
 
export default Tarea;