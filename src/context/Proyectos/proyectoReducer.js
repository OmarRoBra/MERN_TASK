import {FORMULARIO_PROYECTO,OBTENER_PROYECTO,AGREGAR_PROYECTO,VALIDAR_FORM
,PROYECTO_ACTUAL,
ELIMINAR_PROYECTO} from '../../types/index'
export default(state,action)=>{
    switch(action.type){
        case FORMULARIO_PROYECTO:
            return{
                ...state,
                nuevoProyecto: true
            }
            case OBTENER_PROYECTO:
                return{
                    ...state,
                    proyectos:action.payload

                }
                case AGREGAR_PROYECTO:
                    return{
                        ...state,
                        proyectos:[...state.proyectos,action.payload],
                         nuevoProyecto:false,
                         errorformulario:false
                    }
                case VALIDAR_FORM:
                    return{
                        ...state,
                        errorformulario:true
                    }
                case PROYECTO_ACTUAL:
                    return{
                        ...state,
                        proyecto:state.proyectos.filter(proyecto=>proyecto._id===action.payload)
                    }
                case ELIMINAR_PROYECTO:
                    return{
                        ...state,
                        proyectos:state.proyectos.filter(proyecto=>proyecto._id !==action.payload),
                        proyecto:null
                    }
            default:
                return state;  
        
    }
}