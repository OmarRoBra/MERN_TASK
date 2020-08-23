import React,{useReducer} from 'react';
import alertaReducer from './alertaReducer'
import alertaContext from './alertaContext'
import {MOSTRAR_ALERTA,OCULTAR_ALERTA} from '../../types/index'

const AlertaState=props=>{
    const initalState={
        alerta:null
    }
    const [state,dispatch]=useReducer(alertaReducer,initalState)

    //funciones
    const mostrarAlerta=(msg,cat)=>(
        dispatch({
            type:MOSTRAR_ALERTA,
            payload:{
                msg,
                cat
            }
              // eslint-disable-next-line
        }),
        setTimeout(()=>{
           dispatch({
               type:OCULTAR_ALERTA
           })
        },5000)
    )
     return(
         <alertaContext.Provider
         value={{
            alert:state.alerta,
            mostrarAlerta
         }}
         >
        {props.children}
         </alertaContext.Provider>
     )
}
export default AlertaState