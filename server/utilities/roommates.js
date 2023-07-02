import bodyParser from '../middleware/bodyParser.js';
import { databaseRoommates } from './data.js';
import fs from 'fs';


export function dataPush( data ){
    databaseRoommates.push(data)
    return databaseRoommates
}

export async function postRoommatesHandler( req, res){
    try {
       await bodyParser(req)
       let data = req.body
       
       res.writeHead(200, {'Content-type':'application/json'} )
        dataPush(data)
        fs.writeFileSync('db/roommates.json', JSON.stringify(databaseRoommates));
        res.write(JSON.stringify(data))
        res.end();
    } catch (error) {
        res.writeHead( 400 , {'Content-Type':'text/plain'})
        res.write('Data invalidaaaaaaaaa');
        res.end();
    }
}

export async function getRoommatesHandler( req, res){
    try {
        // fs.writeFileSync('db/data.json', JSON.stringify(database));
        fs.readFile('db/roommates.json',(err, json )=>{
            res.writeHead( 200, {'Content-type':'application/json'} )
            res.end(json)
        })
    } catch (error) {
        res.writeHead( 400 , {'Content-Type':'text/plain'})
        res.write('Data invalida');
        res.end();
    }
}
