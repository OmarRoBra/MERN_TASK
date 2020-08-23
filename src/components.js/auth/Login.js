import React,{useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';
import alertaContext from '../../context/Alertas/alertaContext'
import AuthContext from '../../context/Autenticacion/AuthContext'

const Login = (props) => {
    const [usuario,guardarUsuario]=useState({
        email:'',
        password:''
    })
    const alertasContext=useContext(alertaContext);
    const{alert,mostrarAlerta}=alertasContext;
    const authContext=useContext(AuthContext);
    const {iniciarSesion,autenticado, mensaje}=authContext;
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
    const {email,password}=usuario;
    const guardarCambio=(e)=>{
    guardarUsuario({
        ...usuario,
        [e.target.name]:e.target.value
    })
    
    }

    const mandar=e=>{
        e.preventDefault();
        if(email.trim()===''|| password.trim()===''){
            mostrarAlerta('Todos los campos son necesario','error')
        }
        iniciarSesion(usuario)

    }
    return (  
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
            {alert?(<div className={`alerta ${alert.cat}`}>{alert.msg}</div>) :null}
                <h1>Inicia Sesión</h1>

                <form
                onSubmit={mandar}>
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
                        <label htmlFor="password">Email</label>
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
                        <input 
                        type="submit" className="btn btn-primario btn-block"
                        value="Iniciar sesion"
                        />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obten una Cuenta
                </Link>

            </div>
             
        </div>
    );
}
 
export default Login;