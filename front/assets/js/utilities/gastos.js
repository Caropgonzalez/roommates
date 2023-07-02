import * as UI from './interfaz.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

function preEdit(id, nombre, comentario, monto){
    UI.roomatesEditSelect.value=nombre;
    UI.descripcionEditGastos.value=comentario;
    UI.montoEditGastos.value=monto;
    UI.idGasto.value=id;
}

export function agregarGasto(e){

    e.preventDefault();

    let nombre = UI.selectRoommates.value,
        descripcion = UI.descripcionGasto.value,
        monto = UI.montoGasto.value,
        id     = uuidv4().slice(0,6)
    
    axios.post('http://localhost:3000/agregarGasto',{
        id,
        nombre,
        descripcion,
        monto
    })
    .then((respuesta)=>{
        console.log('Salida de respuesta-->',respuesta)
        UI.formularioGastos.reset();
        obtenerGastos()
    })
    .catch((err)=>{
        console.log(err)
    })

}



export function obtenerGastos(){
    UI.gastosHistorial.innerHTML = ` `
    axios.get('http://localhost:3000/gastos')
        .then( respuesta => {
            let data = respuesta.data
            console.log('Salida de data',data)
            data.forEach( (element, index) => {
                const { id, nombre, descripcion, monto } = element
                UI.gastosHistorial.innerHTML += `<tr>
                <td>${nombre}</td>
                <td>${descripcion}</td>
                <td class=text-success">${monto}</td>
                <td class="d-flex align-items-center justify-content-between">
                <i class="fas fa-edit text-warning buttonEditar" data-id="${id}" data-nombre="${nombre}" data-comentario="${descripcion}" data-monto="${monto}" data-bs-toggle="modal" data-bs-target="#modalEditGastos"></i>
                <i class="fas fa-trash-alt text-danger"></i>
              </td>
              </tr>`
            });

            let todosLosButtonsEditar = document.querySelectorAll('tr td .buttonEditar');
            todosLosButtonsEditar.forEach((button)=>{
                button.addEventListener('click', ( e )=>{
                    e.preventDefault()
                    let id = e.target.getAttribute('data-id')
                    let nombre = e.target.getAttribute('data-nombre')
                    let comentario = e.target.getAttribute('data-comentario')
                    let monto = e.target.getAttribute('data-monto')
                    preEdit(id,nombre,comentario,monto)
                } )
            })

        })
}



export async function guardarGastosEditados(e){

    let id = e.target.id,
        nombre = UI.roomatesEditSelect.value,
        descripcion = UI.descripcionEditGastos.value,
        monto = UI.montoEditGastos.value,
        idGasto = UI.idGasto.value
    axios.put('http://localhost:3000/editarGastos',{
        id,
        nombre,
        descripcion,
        monto
    })
    .then( respuesta =>{
        location.reload() 
        console.log('Respuesta editados-->',respuesta)
    })

}



