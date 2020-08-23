import React from 'react';
import Nuevoproyecto from '../proyectos/Nuevoproyecto'
import Listado from '../proyectos/Listado'
const Sidebar = () => {
    return (   <aside>
        <h1>MERNS <span>Tasks</span></h1>
        <Nuevoproyecto />
        <div className="proyectos">
            <h2>Tus proyectos</h2>
            <Listado />

        </div>
                
        </aside>);
}
 
export default Sidebar;