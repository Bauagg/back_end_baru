const mongoose = require('mongoose')

const { dbPort, dbHost, dbName } = require('../APP/config')

mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`)

const db = mongoose.connection

module.exports = db