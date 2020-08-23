import React,{useReducer} from 'react';
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token'
import{REGISTRO_ERROR,REGISTRO_EXITOSO,
    OBTENER_USUARIO,LOGIN_ERROR,
    LOGIN_EXITOSO,CERRAR_SESION} from '../../types/index'

const AuthState=props=>{
  
    const initialState={
        token:localStorage.getItem('token'),
        autenticado:false,
        usuario:null,
        mensaje:null,
        cargando:true
    }
    const [state,dispatch]=useReducer(AuthReducer,initialState)

    const registrarUsuario=async datos=>{
        try{
            //realiza una peticion post a la API    
           const respuesta=await clienteAxios.post('/api/v1/users',datos);
           dispatch({
               type:REGISTRO_EXITOSO,
               payload:respuesta.data
           });
           usuarioAutenticado();
        }catch(error){
            console.log(error.response);
            const alerta=({
                msg:error.response.data.msg,
                categoria:'error'
            })
            dispatch({
                type:REGISTRO_ERROR,
                payload:alerta
        })
        }
    }

    const usuarioAutenticado=async()=>{
        const toked=localStorage.getItem('token')
        if(toked){
            tokenAuth(toked)
        }
        try{
            const usuario= await clienteAxios.get('/api/v1/auth')
            console.log(usuario)
            dispatch({
                type:OBTENER_USUARIO,
                payload:usuario.data
            })
        }catch(error){
         dispatch({
             type:LOGIN_ERROR
         })
        }
    }
   
    const iniciarSesion=async datos=>{
        try {
             const  respuesta= await clienteAxios.post('/api/v1/auth',datos);
             console.log(respuesta)
             dispatch({
                 type:LOGIN_EXITOSO,
                 payload:respuesta.data

             })
             usuarioAutenticado();
        } catch (error) {
            console.log(error.response.data.msg);
            const alerta=({
                msg:error.response.data.msg,
                categoria:'error'
            })
            dispatch({
                type:LOGIN_ERROR,
                payload:alerta
        })
        }
    }
   const cerrarSesion=()=>{
       dispatch({
           type:CERRAR_SESION
       })
   }
    return(
        <AuthContext.Provider
        value={{
            token:state.token,
            autenticado:state.autenticado,
            usuario:state.usuario,
            mensaje:state.mensaje,
            cargando:state.cargando,
            registrarUsuario,
            iniciarSesion,
            usuarioAutenticado,
            cerrarSesion
            
        }}
        >

            {props.children}
        
        </AuthContext.Provider>
    )
}

export default AuthState;