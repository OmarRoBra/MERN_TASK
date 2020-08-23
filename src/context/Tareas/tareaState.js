import React,{useReducer} from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer'

import clienteAxios from '../../config/axios'

import {TAREAS_PROYECTO,
        AGREGAR_TAREA,
        VALIDAR_TAREA,
        ELIMINAR_TAREA,
        ESTADO_TAREA,
        TAREA_ACTUAL,
        ACTUALIZAR_TAREA,
        LIMPIAR_TAREA} from '../../types/index'

const TareaState = props => {
    const initialState={
        tareasproyecto:[],
        errortarea:false,
        tareaseleccionada:null
        }

    const [state,dispatch]=useReducer(TareaReducer,initialState)

    const filtrarTareas = async proyecto=>{
       try {
           const resultado= await clienteAxios.get('/api/v1/tareas',{params:{proyecto}})
           console.log(resultado)
        dispatch({
            type:TAREAS_PROYECTO,
            payload:resultado.data.tarea
        })
       } catch (error) {
           console.log(error)
       }
    }
    const agregarTarea=async tarea=>{
        try {
            const resultado= await clienteAxios.post('/api/v1/tareas',tarea)
            console.log(resultado);
            dispatch({
                type:AGREGAR_TAREA,
                payload:tarea
            })
        } catch (error) {
            console.log(error.response)
        }
      
    }

    const validarTask=()=>{
        dispatch({
            type:VALIDAR_TAREA
        })
    }
    //Eliminar tarea por id
    const eliminarTaks=async(id,proyecto)=>{
       try {
           await clienteAxios.delete(`/api/v1/tareas/${id}`,{params:{proyecto}})
        dispatch({
            type:ELIMINAR_TAREA,
            payload:id
        })
       } catch (error) {
           console.log(error.response)
       }
    }
    //cambia el estado de la tarea
    const cambiaEstado=tarea=>{
        dispatch({
            type:ESTADO_TAREA,
            payload:tarea  
        })
    }
    //extrae tarea para edicion
    const tareaActual=tarea=>{
        dispatch({
            type:TAREA_ACTUAL,
            payload:tarea
        })
    }
    const Actulizar=tarea=>{
        dispatch({
            type:ACTUALIZAR_TAREA,
            payload:tarea
        })
    }

    const cleaner=()=>{
        dispatch({
            type:LIMPIAR_TAREA
        })
    }

    return(
    <TareaContext.Provider
    value={{
        tareasproyecto:state.tareasproyecto,
        errorTarea:state.errorTarea,
        tareaseleccionada:state.tareaseleccionada,
        filtrarTareas,
        agregarTarea,
        validarTask,
        eliminarTaks,
        cambiaEstado,
        tareaActual,
        Actulizar,
        cleaner
    }}
    >
        {props.children}
    </TareaContext.Provider>
    )
}
 
export default TareaState;