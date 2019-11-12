import path from 'path'
import dotenv from 'dotenv'

const fileDotEnv = path.resolve(__dirname, '../.env')
dotenv.config({path: fileDotEnv})

let error = false

if(process.env.PORT === undefined) {
    console.log('PORT NOT DEFINED')
    error = true
}

if(process.env.MONGODB_EMBARCADO === undefined) {
    console.log('MONGODB NOT DEFINED')
    error = true
}

if(error)
    process.exit(1)


const PORT = parseInt(process.env.PORT, 10)
const MONGODB_EMBARCADO = process.env.MONGODB_EMBARCADO

export {PORT, MONGODB_EMBARCADO}