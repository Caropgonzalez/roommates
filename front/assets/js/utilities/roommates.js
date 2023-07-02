import * as UI from './interfaz.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


export function agregarRoommate(e){

    e.preventDefault();

    let nombre = UI.selectRoommates.value,
        saldo = UI.roommateModalSaldo.value,
        cuota = UI.roommateModalCuota.value,
        id     = uuidv4().slice(0,6)
    
    axios.post('http://localhost:3000/agregar',{
        id,
        nombre,
        saldo,
        cuota
    })
    .then((respuesta)=>{
        console.log('Salida de respuesta-->',respuesta)
        UI.formularioGastos.reset();
        obtenerRoommates()
    })
    .catch((err)=>{
        console.log(err)
    })

}



export function obtenerRoommates(){
    UI.infoTable.innerHTML = ` `
    axios.get('http://localhost:3000/roommates')
        .then( respuesta => {
            let data = respuesta.data
            cargarSelectRoommates(data)
            console.log('Salida de data',data)
            data.forEach( (element, index) => {
                const { id, nombre, saldo, cuota } = element
                UI.infoTable.innerHTML += `<tr>
                <th scope="row">${index+1}</th>
                <td>${nombre}</td>
                <td class=text-success>${saldo}</td>
                <td class=text-danger">${cuota}</td>

                
              </tr>`
            });

            let todosLosButtonsEditar = document.querySelectorAll('tr td button.buttonEditar');
            todosLosButtonsEditar.forEach((button)=>{
                button.addEventListener('click', ( e )=>{
                    e.preventDefault()
                    let id = e.target.getAttribute('data-id')
                    let nombre = e.target.getAttribute('data-nombre')
                    let precio = e.target.getAttribute('data-precio')
                    preEdit(id,nombre,precio)
                } )
            })

        })
}



export async function guardarRoommatesEditados(e){

    let id = e.target.id,
        nombre =  UI.nombreModal.value,
        precio = UI.precioModal.value 
    axios.put('http://localhost:3000/editar',{
        id,
        nombre,
        precio
    })
    .then( respuesta =>{
        location.reload() 
        console.log('Respuesta editados-->',respuesta)
    })

}

function cargarSelectRoommates(roommates){
    roommates.forEach(element => {
        UI.selectRoommates.innerHTML += `
       <option value="${element.nombre}">${element.nombre}</option>`
       UI. roomatesEditSelect.innerHTML += `
       <option value="${element.nombre}">${element.nombre}</option>`
    });
}


