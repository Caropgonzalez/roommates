import bodyParser from '../middleware/bodyParser.js';
import { databaseGastos } from './data.js';
import fs from 'fs';


export function dataPush( data ){
    databaseGastos.push(data)
    return databaseGastos
}

export async function postGastosHandler( req, res){
    try {
       await bodyParser(req)
       let data = req.body
       console.log(data)
       res.writeHead(200, {'Content-type':'application/json'} )
        dataPush(data)
        fs.writeFileSync('db/gastos.json', JSON.stringify(databaseGastos));
        res.write(JSON.stringify(data))
        res.end();
    } catch (error) {
        res.writeHead( 400 , {'Content-Type':'text/plain'})
        res.write('Data invalidaaaaaaaaa');
        res.end();
    }
}

export async function getGastosHandler( req, res){
    try {
        // fs.writeFileSync('db/data.json', JSON.stringify(database));
        fs.readFile('db/gastos.json',(err, json )=>{
            res.writeHead( 200, {'Content-type':'application/json'} )
            res.end(json)
        })
    } catch (error) {
        res.writeHead( 400 , {'Content-Type':'text/plain'})
        res.write('Data invalida');
        res.end();
    }
}


export async function putGastosHandler( req, res){
    try{
        await bodyParser(req)
        const { id,nombre,descripcion,monto } = req.body

        let gastos = databaseGastos;
        gastos = gastos.map((d)=>{
            if( d.id == id){
                d.nombre = nombre
                d.descripcion = descripcion
                d.monto = monto
                return d
            }
            return d
        })

        fs.writeFileSync('db/gastos.json', JSON.stringify(gastos));
        fs.readFile('db/gastos.json',( err, json)=>{
            res.writeHead( 200, {'Content-type':'application/json'} )
            err ? console.log('Ho es un error') : console.log('Gasto editado con exito')
            res.end(json)
        })
    }catch(error){
        res.writeHead( 400 , {'Content-Type':'text/plain'})
        res.write('Data invalida');
        res.end();
    }
}

export async function deleteGastosHandler( req,res){
    try{
        await bodyParser(req)
        const { id } = req.body
        let gastos = databaseGastos
        gastos.map((d,index)=>{
            if(d.id == id){
                gastos.splice(index,1);
                fs.writeFileSync('db/gastos.json', JSON.stringify(gastos))
            }
        })
        res.end();
    }catch(error){
        res.writeHead( 400 , {'Content-Type':'text/plain'})
        res.write('Data invalida');
        res.end();
    }
}



