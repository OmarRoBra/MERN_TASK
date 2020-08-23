import React,{useContext,useState,useEffect} from 'react';
import proyectoContext from '../../context/Proyectos/proyectoContext'
import TareaContext from '../../context/Tareas/tareaContext'
const Formtarea = () => {
    const proyectosContext=useContext(proyectoContext)
    const {proyecto}=proyectosContext;
    const tareasContext=useContext(TareaContext)
    const {agregarTarea,validarTask,filtrarTareas,tareaseleccionada, Actulizar,cleaner} =tareasContext;
    const [tareas,guardarTarea]=useState({
        nombre:''
    })

    //Efect que detecta si hay una tarea
    useEffect(()=>{
         if(tareaseleccionada !==null){
             guardarTarea(tareaseleccionada)
         }else{
             guardarTarea({
                 nombre:''
             })
         }
    },[tareaseleccionada])
    
    const {nombre}=tareas;
    if(!proyecto)return null;
    const [proyectoActual]=proyecto;

    const onsub =e=>{
        e.preventDefault();
        if(nombre.trim()===''){
            validarTask();
            console.log('xd')    
            return;  
             
        }
        if(tareaseleccionada ===null){
         
        tareas.proyecto=proyectoActual._id
        agregarTarea(tareas)
        }else{
            Actulizar(tareas)
            cleaner();
        }

        filtrarTareas(proyectoActual.id)
        guardarTarea({
            nombre:''
        })

        
    }

    const handleChange=e=>{
       guardarTarea({
           ...tareas,
           [e.target.name]:e.target.value
       })
    }
    return ( 

        <div className="formulario">
            <form
            onSubmit={onsub}
            >
                <div className="contenedor-input">
                    <input
                    type="text"
                    className="input-text"
                    placeholder="nombre Tarea"
                    name="nombre"
                    value={nombre}
                    onChange={handleChange}
                    />

                </div>
                <div className="contenedor-input">
                    <input
                    type="submit"
                    className="btn btn-primario btn-submit btn-block"
                    value={tareaseleccionada? "Edita Tarea" : "Agrega  Tarea"}
                    />

                </div>

            </form>

        </div>
     );
}
 
export default Formtarea;