import mongoose from 'mongoose'
import {MONGODB_EMBARCADO} from './env'

const dataSchema = new mongoose.Schema({
    title: String,
    date: Date,
    value: Number,
})

const Data = mongoose.model('Data', dataSchema)

function connect (res) {}

function disconnect (res) {}

