import {MOSTRAR_ALERTA,OCULTAR_ALERTA, LOGIN_ERROR} from '../../types/index'

export default(state,action)=>{
    switch(action.type){
        case MOSTRAR_ALERTA:
            return{
                   alerta:action.payload
            }
            case LOGIN_ERROR:
        case OCULTAR_ALERTA: 
        localStorage.removeItem('token');
            return{
               alerta:null
            }  
        
                

        default:
            return;
    }
}