import React,{Fragment,useState,useContext} from 'react';
import proyectoContext from '../../context/Proyectos/proyectoContext'

const Nuevoproyecto = () => {
     //obtener el state del formulario queesta en el context
     const proyectosContext=useContext(proyectoContext)
     const { nuevoProyecto,errorformulario,mostrarFormulario,agregarProyecto, mostrarError}=proyectosContext;
     
    const [proyectos,guardarProyectos]=useState({
        nombre:''
    });
    const {nombre}=proyectos;

    const onChangeproyecto=e=>{
        guardarProyectos({
            ...proyectos,
            [e.target.name]:e.target.value
        })
    }

    const onSubmitForm=e=>{
        e.preventDefault();
        if(nombre.trim()===''){
        mostrarError();
        return}

        agregarProyecto(proyectos)
    }
    const onboton=()=>{
        mostrarFormulario();
    }
    return (<Fragment>
        <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={onboton}
        >Nuevo Proyecto</button>

        {nuevoProyecto ?
        (<form
            className="formulario-nuevo-proyecto"
            onSubmit={onSubmitForm}
            >
                <input
                type="text"
                className="input-text"
                placeholder="Nombre Proyecto"
                name="nombre" 
                value={nombre}
                onChange={onChangeproyecto}/>
    
                <input 
                type="submit"
                className="btn btn-primario btn-block"
                value="Agregar Proyecto"
                />
    
            </form>) : null}
            {errorformulario? <p className="mensaje error">El nombre del proyecto es obligatorio</p> :null}
    </Fragment>  );
}
 
export default Nuevoproyecto;