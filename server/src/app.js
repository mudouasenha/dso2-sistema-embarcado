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

app.get('/disconnect', (req, res) => db.disconnect(res))

const server = https.createServer(app)

server.listen(PORT, () => console.log(`No ar, porta ${PORT}...`))