import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Login from './components.js/auth/Login'
import Register from './components.js/auth/Register'
import Proyectos from './components.js/proyectos/Proyectos'
import ProyectoState from './context/Proyectos/projectosState'
import TareaState from './context/Tareas/tareaState'
import AlertaState from './context/Alertas/alertaState'
import AuthState from './context/Autenticacion/AuthState'
import tokenAuth from './config/token'
import RutaPrivada from './components.js/Rutas/rutaPrivada'
//Revisar si hay token 
const token=localStorage.getItem('token')
if(token){
   tokenAuth(token)
}
function App() {
  console.log(process.env.REACT_APP_BACKEND_URL)
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
 <Router>
   <Switch>
     <Route exact path="/" component={Login} />
     <Route exact path="/nueva-cuenta" component={Register} />
     
     <RutaPrivada exact path="/proyectos" component={Proyectos} />
   </Switch>
 </Router>
 </AuthState>
 </AlertaState>
 </TareaState>
 </ProyectoState>
  );
}

export default App;
