import fs from 'fs';
export let databaseRoommates = JSON.parse(fs.readFileSync('db/roommates.json'))
export let databaseGastos = JSON.parse(fs.readFileSync('db/gastos.json'))
