import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import {FORMULARIO_PROYECTO,
        OBTENER_PROYECTO,
        AGREGAR_PROYECTO,
        VALIDAR_FORM,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO} 
        from '../../types/index'
import clienteAxios from '../../config/axios'

//En este archivo extraemos el context le damos el valor inicial y extrameos las acciones
//del reducer;


const ProyectoState=props =>{
  
    const initialState={
        proyectos:[] ,
        nuevoProyecto: false,
        errorformulario:false,
        proyecto:null

    }

    //Dispatch para ejecutar las acciones 
    const [state,dispatch]=useReducer(proyectoReducer,initialState)
    //Serie de funciones para el CRUD 
     const mostrarFormulario=()=>{
         dispatch({
             type:FORMULARIO_PROYECTO
         })
     }

     const obtenerProyectos= async()=>{ 
        try {
           const proyectos=await clienteAxios.get('/api/v1/proyectos')
           console.log(proyectos)
           dispatch({
               type:OBTENER_PROYECTO,
               payload:proyectos.data.proyectos
           })
        } catch (error) {
            console.log(error)
        }
        
     }
     const mostrarError=()=>{
         dispatch({
             type:VALIDAR_FORM
         })
     }

     const agregarProyecto=async proyecto=>{
        try{
            const resultado= await clienteAxios.post('/api/v1/proyectos',proyecto)
            console.log(resultado)
            dispatch({
                type:AGREGAR_PROYECTO,
                payload:resultado.data
            })
        }catch(error){
            console.log(error)
        }

     }

     //selecciona el proyecto al que el usuario dio clock
     const proyectoAtual=proyectoId=>{
         dispatch({
             type:PROYECTO_ACTUAL,
             payload:proyectoId
         })
     }
     const eliminarProyecto=async proyectoId=>{
        try {
            await clienteAxios.delete(`/api/v1/proyectos/${proyectoId}`)
                dispatch({
                    type:ELIMINAR_PROYECTO,
                    payload:proyectoId
                })
        } catch (error) {
            console.log(error)
        }
     }
    return(
        //Retornamos el provider del context junto con elvalor del state inicial

        <proyectoContext.Provider
        value={{
            proyectos:state.proyectos,
            nuevoProyecto:state.nuevoProyecto,
            errorformulario:state.errorformulario,
            proyecto:state.proyecto,
            mostrarFormulario,
            obtenerProyectos,
            agregarProyecto,
            mostrarError,
            proyectoAtual,
            eliminarProyecto
        }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}
export default ProyectoState;