import { PORT } from './env'

import http from 'https'
import fs from 'fs'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import * as db from './db'

const app = express()
const dados = {}

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
			res.send({data: dado})
	
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
		dados.push(dado)

	} catch(err) {
		return res.status(400).send({error: 'erro ao inserir dado' })

	}
})

const server = http.createServer(app)

server.listen(PORT, () => console.log(`No ar, porta ${PORT}...`))
