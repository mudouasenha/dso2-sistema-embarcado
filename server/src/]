import { PORT } from './env'

import https from 'https'
import fs from 'fs'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import * as db from './db'

const app = express()

app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, '../public')))

app.get('/connect', (req, res) => db.connect(res))

app.get('/', (req, res) => {
	return '<p> OI </p>'

})

app.get('/disconnect', (req, res) => db.disconnect(res))

app.get('/dados', (req, res) => {
	try {
		if(dado != undefined)
			return dado
	
	} catch(err) {
		return res.status(400).send({error: 'erro ao mostrar dado' })
	}
})

app.post('/dado', (req,res) => {
	try {
		var dado = {
			valor: req.body.valorObservado,
			nivel: req.body.nivelLuminosidade
		}
	} catch(err) {
		return res.status(400).send({error: 'erro ao inserir dado' })
	}
})

const server = https.createServer(app)

server.listen(PORT, () => console.log(`No ar, porta ${PORT}...`))
