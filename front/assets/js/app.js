import * as UI from './utilities/interfaz.js'
import {
     agregarRoommate,
     obtenerRoommates
} from './utilities/roommates.js'

import {
    agregarGasto,
    guardarGastosEditados,
    obtenerGastos
    
} from './utilities/gastos.js'

if( typeof window === 'object' ){

    window.addEventListener('DOMContentLoaded', function(){
        
        // EVENTO SUBMIT
        UI.formularioGastos.addEventListener('submit', agregarGasto)
        UI.formularioModalRoommate.addEventListener('submit', agregarRoommate)
        UI.formularioEditGastos.addEventListener('submit', guardarGastosEditados)
        obtenerRoommates();
        obtenerGastos();

        // GUARDAR MODAL EDITADA
    // UI.botonGuardarModalRoommate.addEventListener('click', guardarRoommatesEditados )

    })

}

