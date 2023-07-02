import http from 'http';
import fs from 'fs';
import { 
    postRoommatesHandler,
    getRoommatesHandler,

} from './utilities/roommates.js';

import {
    postGastosHandler,
    getGastosHandler,
    putGastosHandler,
    deleteGastosHandler
} from './utilities/gastos.js'

import axios from 'axios';

console.clear()
// Request ---> Consultas
// respond  ---> Respuesta
http
    .createServer(( req, res) => {

        const { url, method } = req;

        switch (method) {
            
            case 'GET':

                if ( url === '/') {
                    res.writeHead(200, {'Content-type':'text/html'} )
                    fs.readFile('../front/index.html','utf8',(err,data)=>{
                        res.end(data);
                    })
                }

                if(url === '/front/assets/js/app.js' ){
                    res.writeHead(200, {'Content-Type':'text/javascript'});
                    res.end( fs.readFileSync('../front/assets/js/app.js') )
                }

                if(url === '/front/assets/js/utilities/interfaz.js' ){
                    res.writeHead(200, {'Content-Type':'text/javascript'});
                    res.end( fs.readFileSync('../front/assets/js/utilities/interfaz.js') )
                }

                if( url === '/front/assets/js/utilities/roommates.js' ){
                    res.writeHead(200, {'Content-Type':'text/javascript'});
                    res.end( fs.readFileSync('../front/assets/js/utilities/roommates.js') )
                }

                if( url === '/node_modules/axios/dist/axios.js' ){
                    res.writeHead(200, {'Content-Type':'text/javascript'});
                    res.end( fs.readFileSync('./node_modules/axios/dist/axios.js') )
                }
                
                //::::::::::::::::::::::RUTA GASTOS:::::::::::::::::::::::::::
                
                if( url === '/front/assets/js/utilities/gastos.js' ){
                    res.writeHead(200, {'Content-Type':'text/javascript'});
                    res.end( fs.readFileSync('../front/assets/js/utilities/gastos.js') )
                }

            if( url === '/roommates'){
                getRoommatesHandler( req, res )
            }
            if( url === '/gastos'){
                getGastosHandler( req, res )
            }
            
                break
            case 'POST':
                if(url === '/agregar'){
                    postRoommatesHandler( req, res )
                }
                if(url === '/agregarGasto'){
                    postGastosHandler( req, res )
                }
             break  
             case 'PUT':
                if(url === '/editarGasto'){
                    putGastosHandler(req, res)
                }
             break 
             case 'DELETE':
                
                if(url === '/eliminarGasto'){
                    deleteGastosHandler(req,res)
                }

             break  
            default:
                break;
        }
    })

    .listen( 3000, () => console.log('Servidor Arriba en el puerto 3000') )
