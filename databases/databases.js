const mongoose = require('mongoose')

const { dbHost, dbName, dbPort } = require('../APP/config')

mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`)

const db = mongoose.connection

module.exports = db