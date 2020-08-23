import React,{useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';
import alertaContext from '../../context/Alertas/alertaContext'
import AuthContext from '../../context/Autenticacion/AuthContext'

const Register = (props) => {

    const alertasContext=useContext(alertaContext);
    const{alert,mostrarAlerta}=alertasContext;

    const authContext=useContext(AuthContext);
    const {registrarUsuario,autenticado, mensaje}=authContext;

    //en caso de que sea un registro  exitoso o erroneo
    useEffect(()=>{
        if(autenticado){
            //Manda a la url o path de proyectos si el usuario está autenticado
            props.history.push('/proyectos')
        }
        if(mensaje){
            return mostrarAlerta(mensaje.msg,mensaje.categoria)
        }
          // eslint-disable-next-line
    },[mensaje,autenticado,props.history])

    const [usuario,guardarUsuario]=useState({
        email:'',
        password:'',
        nombre:'',
        confirmar:''
    })
    const {email,password,nombre,confirmar}=usuario;
    const guardarCambio=(e)=>{
    guardarUsuario({
        ...usuario,
        [e.target.name]:e.target.value
    })
    
    }

    const mandar=e=>{
        e.preventDefault();
        if(nombre.trim()===''||email.trim()===''|| password.trim()===''|| email.trim()===''|| confirmar.trim()==='') {
            return mostrarAlerta('Todos los campos son necesario','error')
        }
         if(password<6){
            return mostrarAlerta('la contraseña debe tener minimo 6 caracteres','error')

         }
         if(password !== confirmar){
            return mostrarAlerta('las contraseñas no coinciden','error')
         }

         registrarUsuario({
             nombre,email,password
         });
    }
    return (  
        <div className="form-usuario">
            
            <div className="contenedor-form sombra-dark">
            {alert?(<div className={`alerta ${alert.cat}`}>{alert.msg}</div>) :null}
                <h1>Obtener Cuenta</h1>

                <form
                onSubmit={mandar}>
                     <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={nombre}
                        placeholder="Tu Nombre"
                        onChange={guardarCambio}
                        />

                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="Tu email"
                        onChange={guardarCambio}
                        />

                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        placeholder="Coloca tu contraseña"
                        onChange={guardarCambio}
                        />

                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmae">Confirmar Password</label>
                        <input 
                        type="password"
                        id="confirmar"
                        name="confirmar"
                        value={confirmar}
                        placeholder="Repite tu Password"
                        onChange={guardarCambio}
                        />

                    </div>
                    <div className="campo-form">
                        <input 
                        type="submit" className="btn btn-primario btn-block"
                        value="Registrar"
                        />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Iniciar Sesión
                </Link>

            </div>
             
        </div>
    );
}
 
export default Register;